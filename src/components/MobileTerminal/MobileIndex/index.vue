<template>
  <div v-title data-title="AH5 GAMES" id="homeId">
    <StartAndEnd>
      <div>
        <TopBox :topGameList="topGameList"></TopBox>
        <AppList :appGameList="appGameList"></AppList>
        <BottomList :typeList="gameTypeList"></BottomList>
        <BottomText></BottomText>
      </div>
    </StartAndEnd>
    <div class="smegma" :style="bg" v-if="!smegmaHide">
      <div class="btn" :style="btnBg" @click="smegmaHideClick(count == 0 ? true : false)">
        {{ count == 0 ? countText : count }}
      </div>
      <div :style="advBg">
        <div class="adv">
          <ins class="adsbygoogle"
               style="display:block;min-height: 300px"
               data-ad-client="ca-pub-9846530703102193"
               data-ad-slot="4612687250"
               data-ad-format="true"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
      <div class="desc"><img :src="wz" alt=""></div>
    </div>
  </div>
</template>

<script>
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import TopBox from "@/components/MobileTerminal/MobileHome/TopBox";
import AppList from "@/components/MobileTerminal/MobileHome/AppList";
import BottomList from "@/components/MobileTerminal/MobileHome/BottomList";
import BottomText from "@/components/MobileTerminal/MobileHome/BottomText";

import shooting from '@/assets/01shooting.jpg';
import car from '@/assets/02car.jpg';
import ball from '@/assets/03ball.jpg';
import girls from '@/assets/04girls.jpg';
import casual from '@/assets/05casu.jpg';
import puzzle from '@/assets/06puzzle.jpg';
import action from '@/assets/07action.jpg';
import racing from '@/assets/08racing.jpg';
import parkour from '@/assets/09parkour.jpg';
import sand from '@/assets/093d.jpg';

import {getGameList, determinePcOrMove, getGameType, shuffle, recentGame} from '@/utils/utils.js'
import bgImg from '@/assets/advertisement/bg.jpg';
import btnBg from '@/assets/advertisement/btn_anniu.png';
import wz from '@/assets/advertisement/wz.png';
import bg2 from '@/assets/advertisement/bg2.png';
export default {
  name: "mobileIndex",
  data() {
    return {
      allGameList: [], // 全部游戏
      topGameList: [], // 移动端头部游戏列表
      appGameList: [], // 中间游戏列表
      gameTypeList: [], // 底部游戏类型
      shooting,
      car,
      ball,
      girls,
      casual,
      puzzle,
      action,
      racing,
      parkour,
      sand,
      logoutCount: 0, // 长时间未操作
      timerDate: null, // 定时器
      advBg: {
        backgroundImage: `url(${bg2})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        minHeight: '300px'
      },
      bg: {
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      btnBg: {
        backgroundImage: `url(${btnBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      count: 5, // 倒计时按钮
      countText: 'CLOSE', // 倒计时按钮
      timerCountdown: null, // 倒计时
      count2: 5, // 倒计时按钮
      timerCountdown2: null, // 倒计时
      wz,
      smegmaHide: false, // 隐藏蒙层
    }
  },
  components: {
    StartAndEnd,TopBox,AppList,BottomList,BottomText
  },

  mounted() {
    if (determinePcOrMove() == 2) {
      this.$router.push({
        path: '/P/homeIndex'
      },()=>{})
    } else {
      let enterType = sessionStorage.getItem('enterType')
      if (enterType) {
        this.smegmaHide = true
      } else {
        sessionStorage.setItem('enterType', '1')
        this.smegmaHide = false
        this.countdown()
      }
      getGameList().then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          let allGameList = []
          dataObj && dataObj.map((item)=>{
            allGameList.push(item)
          })
          this.allGameList = allGameList
          clearInterval(this.timerDate)
          this.timer(allGameList)
          let arr = dataObj || [] // 原数组
          let recentGame = []
          if (localStorage.getItem('recentGame')) {
            this.topGameList = JSON.parse(localStorage.getItem('recentGame'))
          } else {
            arr.map((item)=>{
              if (recentGame.length < 5) {
                item.filterStatus = 0 // 筛选状态用来判断点击游戏时替换数组中的位置元素
                recentGame.push(item)
              }
            })
            this.topGameList = recentGame
            localStorage.setItem('recentGame',JSON.stringify(recentGame))
          }
          // this.topGameList = arr.splice(0,5) // 头部五条数据
          let newArr = [] // 新数组
          let num = Math.ceil(arr.length / 11)
          for ( let i = 1; i <= num; i++ ) {
            newArr[i - 1] = arr.splice(0,11)
          }
          console.log(newArr);
          this.appGameList = newArr

          // 监听鼠标
          document.getElementById('homeId').onmousemove = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
          // 监听键盘
          document.getElementById('homeId').onkeydown = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
          // 监听Scroll
          document.getElementById('homeId').onscroll = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
      getGameType().then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { game_type } = dataObj || {}
        if (code == 1) {
          game_type && game_type.map(()=>{
            game_type[0].iconUrl = this.shooting
            game_type[1].iconUrl = this.car
            game_type[2].iconUrl = this.ball
            game_type[3].iconUrl = this.girls
            game_type[4].iconUrl = this.casual
            game_type[5].iconUrl = this.puzzle
            game_type[6].iconUrl = this.action
            game_type[7].iconUrl = this.racing
            game_type[8].iconUrl = this.parkour
            game_type[9].iconUrl = this.sand
          })
          this.gameTypeList = game_type
        } else {
          this.$message.error('获取游戏类别失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  },
  methods: {
    smegmaHideClick(type) {
      this.smegmaHide = type
      if (type) {
        this.timer(this.allGameList)
      }
    },
    timer(allGameList) {
      if (this.smegmaHide) {
        let arr = []
        allGameList && allGameList.map((item)=>{
          arr.push(item)
        })
        let newArr = shuffle(arr.splice(0,30))
        clearInterval(this.timerDate)
        this.timerDate = setInterval(()=>{
          this.logoutCount++
          console.log(this.logoutCount);
          if (this.logoutCount >= 10) {
            recentGame(newArr[0])
            window.location.href = '/#/M/details?gameId=' + newArr[0].gameId
          }
        },1000)
      }
    },
    countdown() {
      clearInterval(this.timerCountdown)
      this.timerCountdown = setInterval(()=>{
        this.count -= 1
        console.log(this.count);
        if (this.count <= 0) {
          clearInterval(this.timerCountdown)
          this.countdown2()
        }
      },1000)
    },
    countdown2() {
      // 倒计时结束后5s关闭推荐
      clearInterval(this.timerCountdown2)
      this.timerCountdown2 = setInterval(()=>{
        this.count2 -= 1
        console.log(this.count2);
        if (this.count2 <= 0) {
          clearInterval(this.timerCountdown2)
          this.smegmaHideClick(true)
        }
      },1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timerDate);
    clearInterval(this.timerCountdown)
  }
}
</script>

<style lang="less" scoped>
#homeId{
  height: 100vh;
  overflow-y: auto;
  position: relative;
  .smegma{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .btn{
      width: 10.3888rem;
      height: 3.5rem;
      margin: 42% auto 0;
      text-align: center;
      line-height: 3.3rem;
      font-size: 2rem;
      color: #874000;
    }
    .adv-bg{
      margin-top: 1rem;
    }
    .desc{
      padding: 0.5rem 0.8rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
