<template>
  <div class="contact">
    <div :class="determinePcOrMove ==1 ? contact_us_M : contact_us">
      <h4>Contact Us</h4>
      <span>Drop us a line, we would like to hear from you!</span>
      <div class="form_box">
        <el-form ref="form" :model="formData" :rules="rules">
          <el-form-item>
            <el-input v-model="formData.name" name="name" placeholder="*Name" @input="nameChange"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="formData.email" name="email" placeholder="*Email" @input="emailChange"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;justify-content: space-between">
              <el-input v-model="formData.pin" name="pin" placeholder="*PIN" style="width: 318px" @input="pinChange"></el-input>
              <div class="pin">
                <canvas width="168" height="50" id="check" style="border:1px solid #000;">您的浏览器不支持canvas标签！</canvas>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input
                v-model="formData.message"
                name="message"
                type="textarea"
                :rows="5"
                placeholder="*Message"
                @input="messageChange"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="sendMessage('form')" :class="sendButtonType ? sendButtonG : sendButton">Send Message</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { determinePcOrMove } from '@/utils/utils.js'
import request from '@/utils/request.js'
export default {
  name: "ContactUs",
  components: {
  },
  data() {
    return {
      determinePcOrMove: determinePcOrMove() || 1,
      contact_us: ["contact_us"],
      contact_us_M: ["contact_us_M"],

      formData: {
        name: '',
        email: '',
        message: '',
        pin: ''
      },
      rules: {
        email: [
          { pattern: /^\w+@[a-z0-9]+\.[a-z]+$/i, message: '请输入正确email' }
        ],
      },
      pin: '', // 验证码
      sendButtonType: false,
      sendButton: ['sendButton'],
      sendButtonG: ['sendButtonG'],
    }
  },
  mounted() {
    this.drawCanvas()
  },
  methods: {
    // name改变
    nameChange() {
      let status = this.formData.email && this.formData.pin && this.formData.message
      if (status && this.formData.name.trim()) {
        this.sendButtonType = true
      } else {
        this.sendButtonType = false
      }
    },
    // email改变
    emailChange() {
      let status = this.formData.name && this.formData.pin && this.formData.message
      if (status && this.formData.email.trim()) {
        this.sendButtonType = true
      } else {
        this.sendButtonType = false
      }
    },
    // pin改变
    pinChange() {
      let status = this.formData.email && this.formData.name && this.formData.message
      if (status && this.formData.pin.trim()) {
        this.sendButtonType = true
      } else {
        this.sendButtonType = false
      }
    },
    // message改变
    messageChange() {
      let status = this.formData.email && this.formData.pin && this.formData.name
      if (status && this.formData.message.trim()) {
        this.sendButtonType = true
      } else {
        this.sendButtonType = false
      }
    },
    // 发送
    sendMessage(form) {
      console.log(this.pin);
      let value = this.pin == this.formData.pin
      console.log(value);
      if (!this.sendButtonType) {
        return
      }
      if (value) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            request({
              url: 'https://formspree.io/f/xrgvjyay',
              method: 'post',
              data: {
                name: this.formData.name,
                email: this.formData.email,
                message: this.formData.message
              }
            }).then((res)=>{
              console.log(res);
              if (res.status == 200 && res.data.ok) {
                this.$message.success("发送成功")
              }
            }).catch((err)=>{
              console.log(err);
            })
          }
        })
      } else {
        this.$message.error("验证码错误")
        this.drawCanvas()
      }
    },
    drawCanvas() {

      let that = this

      var ctx = document.getElementById("check").getContext("2d");
      var ctxW = document.getElementById("check").clientWidth;
      var ctxH = document.getElementById("check").clientHeight;

      /**
       * 产生一个随机数  可设置随机数区间
       * @param  {[Number]} min [随机数区间下限]
       * @param  {[Number]} max [随机数区间上限]
       * @return {[Number]}     [返回一个在此区间的随机数]
       */
      function ranNum(min, max) {

        return Math.random() * (max - min) + min;

      }

      /**
       * 返回一个随机颜色 可设置颜色区间
       * @param  {[Number]} min [颜色下限]
       * @param  {[Number]} max [颜色上限]
       * @return {[String]}     [随机颜色]
       */
      function ranColor(min, max) {
        var r = ranNum(min, max);

        var g = ranNum(min, max);

        var b = ranNum(min, max);

        // return "rgb(" + r + "," + g + "," + b + ")";
        return `rgb(${r},${g},${b})`;

      }

      /**
       * 随机字符串数组
       * @return {[Array]} [随机数组]
       */
      function ranStr() {

        var str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

        return str.split("").sort(function () {
          return Math.random() - 0.5
        });

      }

      /**
       * 绘制文本字符串
       * @param  {[String]} canvasId [canvas的id]
       * @param  {[Number]} canvasW  [canvas的width]
       * @param  {[Number]} canvasH  [canvas的height]
       * @param  {[Number]} num      [绘制验证码的字数]
       * @param  {[Number]} fsMin    [字体大小下限]
       * @param  {[Number]} fsMax    [字体大小上限]
       * @param  {[Number]} frMin    [字体旋转偏移下限]
       * @param  {[Number]} frMax    [字体旋转偏移上限]
       * @param  {[Number]} min      [颜色下限]
       * @param  {[Number]} max      [颜色上限]
       * @return {[String]} [随机字符串]
       */
      function drawText(canvasId, canvasW, canvasH, num, fsMin, fsMax, frMin, frMax, min, max) {

        var str = "";

        for (var i = 0; i < num; i++) {

          var char = ranStr()[Math.floor(0, ranStr().length)];

          var fs = ranNum(fsMin, fsMax);

          canvasId.font = fs + "px Verdana";

          canvasId.fillStyle = ranColor(min, max);

          // 保存绘制的状态
          canvasId.save();

          // context.translate(x,y);
          // x    添加到水平坐标（x）上的值
          // y    添加到垂直坐标（y）上的值
          // 偏移
          canvasId.translate(canvasW / num * i + canvasW / 20, 0);

          // 变换角度
          canvasId.rotate(ranNum(frMin, frMax) * Math.PI / 180);

          // context.fillText(text,x,y,maxWidth);
          // text    规定在画布上输出的文本。
          // x    开始绘制文本的 x 坐标位置（相对于画布）。
          // y    开始绘制文本的 y 坐标位置（相对于画布）。
          // maxWidth    可选。允许的最大文本宽度，以像素计。
          canvasId.fillText(char, 0, (canvasH + fs) / 2.5, canvasW / num);

          // 返回之前保存过的路径状态和属性
          ctx.restore();

          str += char;

        }

        // console.log(str);
        return str;

      }

      /**
       * 绘制背景
       * @param  {[String]} canvasId [canvas的id]
       * @param  {[Number]} canvasW  [canvas的width]
       * @param  {[Number]} canvasH  [canvas的height]
       * @param  {[Number]} min      [下限]
       * @param  {[Number]} max      [上限]
       */
      function drawBg(canvasId, canvasW, canvasH, min, max) {

        // 绘制canvas背景
        canvasId.fillStyle = ranColor(min, max);

        // 填充颜色
        canvasId.fillRect(0, 0, canvasW, canvasH);

      }

      /**
       * 绘制干扰 圆点
       * @param  {[String]} canvasId [canvas的id]
       * @param  {[Number]} canvasW  [canvas的width]
       * @param  {[Number]} canvasH  [canvas的height]
       * @param  {[Number]} num      [绘制的数量]
       * @param  {[Number]} r        [圆点半径]
       * @param  {[Number]} min      [下限]
       * @param  {[Number]} max      [上线]
       */
      function drawCircle(canvasId, canvasW, canvasH, num, r, min, max) {

        for (var i = 0; i < num; i++) {

          // 开始绘制 （拿起笔）
          canvasId.beginPath();

          // context.arc(x,y,r,sAngle,eAngle,counterclockwise); （绘制）
          // x    圆的中心的 x 坐标。
          // y    圆的中心的 y 坐标。
          // r    圆的半径。
          // sAngle    起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
          // eAngle    结束角，以弧度计。
          // counterclockwise    可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
          canvasId.arc(ranNum(0, canvasW), ranNum(0, canvasH), r, 0, 2 * Math.PI);

          // 填充颜色
          canvasId.fillStyle = ranColor(min, max);

          // 填充
          canvasId.fill();

          // 闭合绘制 （放开笔）
          canvasId.closePath();

        }

      }

      /**
       * 绘制干扰 线段
       * @param  {[String]} canvasId [canvas的id]
       * @param  {[Number]} canvasW  [canvas的width]
       * @param  {[Number]} canvasH  [canvas的height]
       * @param  {[Number]} num      [绘制的数量]
       * @param  {[Number]} min      [下限]
       * @param  {[Number]} max      [上线]
       */
      function drawLine(canvasId, canvasW, canvasH, num, min, max) {

        for (var i = 0; i < num; i++) {

          // 开始绘制 （拿起笔）
          canvasId.beginPath();

          // 绘制开始点
          canvasId.moveTo(ranNum(0, canvasW), ranNum(0, canvasH));

          // 绘制结束点
          canvasId.lineTo(ranNum(0, canvasW), ranNum(0, canvasH));

          canvasId.strokeStyle = ranColor(min, max);

          canvasId.stroke();

          canvasId.closePath();

        }

      }

      // 绘制验证码
      function drawCanvas() {

        // 清空canvas
        ctx.clearRect(0, 0, 200, 60);

        // 绘制背景
        drawBg(ctx, ctxW, ctxH, 200, 255);

        // 绘制干扰圆点
        drawCircle(ctx, ctxW, ctxH, 20, 5, 200, 255);

        // 绘制干扰线段
        drawLine(ctx, ctxW, ctxH, 20, 0, 255);

        // 绘制验证码
        var str = drawText(ctx, ctxW, ctxH, 4, 10, 50, -30, 30, 0, 100);

        that.pin = str

        return str;

      }
      drawCanvas();
      document.getElementById('check').onclick = drawCanvas;
    }
  }
}
</script>

<style lang="less" scoped>
.contact{
  .contact_us{
    margin: 80px auto 0;
    background-color: #fff;
    width: 600px;
    padding: 52px 50px 30px;
    border-radius: 12px;
    box-sizing: border-box;
    h4{
      font-size: 42px;
      color: #333;
      text-align: center;
    }
    span{
      margin-top: 20px;
      font-size: 18px;
      color: #333;
      display: block;
      text-align: center;
    }
  }
  .contact_us_M{
    margin: 4rem auto 0;
    background-color: #fff;
    width: 16.875rem;
    padding: 1.75rem 1.1875rem .625rem;
    border-radius: 0.25rem;
    box-sizing: border-box;
    h4{
      font-size: 1.3125rem;
      color: #333;
      text-align: center;
    }
    span{
      margin-top: 0.75rem;
      font-size: .8125rem;
      color: #333;
      display: block;
      text-align: center;
    }
  }
  .form_box{
    overflow: hidden;
    .el-form-item{
      margin-bottom: 0;
    }
    .el-input{
      margin-top: 24px;
    }
    /deep/.el-input__inner{
      background-color: #f7f7f7;
      border: 1px solid #a7a7a7;
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      border-radius: 8px;
      display: block;
      font-size: 16px;
      color: #333;
    }
    /deep/.el-input__inner:focus{
      background: #ffffff;
      padding: 0 15px;
      border-color: #1ddef5;
      outline: none;
    }
    .el-textarea{
      margin-top: 24px;
    }
    .pin{
      width: 168px;
      height: 50px;
      margin-top: 24px;
      margin-right: 2px;
    }
    /deep/.el-textarea__inner{
      background-color: #f7f7f7;
      border: 1px solid #a7a7a7;
      padding: 15px;
      border-radius: 8px;
      display: block;
      font-size: 16px;
      color: #333;
      font-family: Arial;
    }
    /deep/.el-textarea__inner:focus{
      background: #ffffff;
      padding: 15px;
      border-color: #1ddef5;
      outline: none;
    }
  }
  .sendButton, .sendButtonG{
    border-radius: 8px;
    background-color: #b7b7b7;
    color: #fff;
    font-size: 16px;
    text-align: center;
    display: block;
    width: 200px;
    height: 50px;
    line-height: 25px;
    margin-top: 24px;
    float: right;
    box-shadow: 4px 3px 5px #cfcfcf;
    border: 0;
    margin-bottom: 6px;
    margin-right: 7px;
    cursor: default;
  }
  .sendButtonG{
    cursor: pointer;
    background-color: #1ddef5;
    color: #0c85b8;
  }
}
</style>
