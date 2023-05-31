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

import { getGameList, determinePcOrMove, getGameType, shuffle } from '@/utils/utils.js'
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
    }
  },
  components: {
    StartAndEnd,TopBox,AppList,BottomList,BottomText
  },
  created() {
    if (determinePcOrMove() == 2) {
      this.$router.push({
        path: '/P/homeIndex'
      },()=>{})
    }
  },
  mounted() {
    getGameList().then((res)=>{
      console.log(res);
      const { data } = res || {}
      const { code, data:dataObj } = data || {}
      if (code == 1) {
        let allGameList = []
        dataObj && dataObj.map((item)=>{
          allGameList.push(item)
        })
        clearInterval(this.timerDate)
        this.timer(allGameList)
        let arr = dataObj || [] // 原数组
        this.topGameList = arr.splice(0,5) // 头部五条数据
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
  },
  methods: {
    timer(allGameList) {
      let arr = []
      allGameList && allGameList.map((item)=>{
        arr.push(item)
      })
      let newArr = shuffle(arr.splice(0,30))
      clearInterval(this.timerDate)
      this.timerDate = setInterval(()=>{
        this.logoutCount++
        if (this.logoutCount >= 10) {
          window.location.href = '/#/M/details?gameId=' + newArr[0].gameId
        }
      },1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timerDate);
  }
}
</script>

<style scoped>
#homeId{
  height: 100vh;
  overflow-y: auto;
}
</style>
