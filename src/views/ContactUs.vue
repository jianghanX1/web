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
