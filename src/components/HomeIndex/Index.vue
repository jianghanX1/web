<template>
  <div id="homeId">
    <Navigation></Navigation>
    <div class="big" v-title data-title="AH5 GAMES">
      <div>
        <Content></Content>
        <Bottom />
      </div>
      <div class="recent-game">
        <div class="title">Recent game</div>
        <div class="content">
          <div class="item" v-for="(item,index) in recentGameList" :key="index" @click="iconClick(item)"><img v-lazy="item.iconUrl" alt=""></div>
        </div>
      </div>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import Navigation from '../Navigation';
import BottomNav from '../BottomNav';
import Content from '@/components/HomeIndex/Content';
import Bottom from '@/components/HomeIndex/Bottom';
import {getGameList, determinePcOrMove, shuffle, recentGame} from '@/utils/utils.js'
export default {
  name: "HomeIndex",
  components: {
    Content,
    Bottom,
    Navigation,
    BottomNav
  },
  data() {
    return {
      recentGameList: [],
      logoutCount: 0, // 长时间未操作
      timerDatePC: null, // 定时器
    }
  },
  created() {

  },
  mounted() {
    if (determinePcOrMove() == 1) {
      this.$router.push({
        path: '/M/homeIndex'
      },()=>{})
    } else {
      this.getList()
    }
  },
  methods: {
    getList() {
      getGameList().then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          let allGameList = []
          dataObj && dataObj.map((item)=>{
            allGameList.push(item)
          })
          clearInterval(this.timerDatePC)
          this.timer(allGameList)
          let arr = dataObj || [] // 原数组
          let recentGame = []
          let recentGamePc = []
          if (localStorage.getItem('recentGame')) {
            JSON.parse(localStorage.getItem('recentGame')) && JSON.parse(localStorage.getItem('recentGame')).map((item)=>{
              if (recentGamePc.length < 4) {
                recentGamePc.push(item)
              }
            })
            this.recentGameList = recentGamePc
          } else {
            // 移动端展示五条
            arr.map((item)=>{
              if (recentGame.length < 5) {
                item.filterStatus = 0 // 筛选状态用来判断点击游戏时替换数组中的位置元素
                recentGame.push(item)
              }
            })

            // pc端展示四条
            recentGame && recentGame.map((item)=>{
              if (recentGamePc.length < 4) {
                recentGamePc.push(item)
              }
            })
            this.recentGameList = recentGamePc
            localStorage.setItem('recentGame',JSON.stringify(recentGame))
          }
          // 监听鼠标
          document.getElementById('homeId').onmousedown = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
          // 监听键盘
          document.getElementById('homeId').onkeydown = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
          console.log(document.getElementById('homeId'));
          // 监听Scroll
          document.getElementById('homeId').onscroll = () => {
            this.logoutCount = 0
            this.timer(allGameList)
          }
        } else {
          this.$message.error('数据加载失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    timer(allGameList) {
      let arr = []
      allGameList && allGameList.map((item)=>{
        arr.push(item)
      })
      let newArr = shuffle(arr.splice(0,30))
      clearInterval(this.timerDatePC)
      this.timerDatePC = setInterval(()=>{
        this.logoutCount++
        console.log(this.logoutCount);
        if (this.logoutCount >= 10) {
          recentGame(newArr[0])
          window.location.href = '/#/P/details?gameId=' + newArr[0].gameId
        }
      },1000)
    },
    // 点击跳转详情
    iconClick(item) {
      this.$router.push({
        path: '/P/details',
        query: {
          gameId: item.gameId
        }
      },()=>{})
    }
  },
  beforeDestroy() {
    clearInterval(this.timerDatePC);
    this.timerDatePC = null
    console.log(111,'sdfsdffsfsfddsf');
  }
}
</script>

<style lang="less" scoped>
#homeId{
  height: 100vh;
  overflow-y: auto;
}
.big{
  display: flex;
  min-width: 730px;
  //height: calc(100vh - 85px);
  //overflow-y: auto;
}
@media screen and (max-width: 840px){
  .recent-game {
    display: none;
  }
}
.recent-game{
  width: 200px;
  margin-top: 20px;
  margin-right: 10px;
  .title{
    line-height: 40px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    background: #F83123;
  }
  .content{
    width: 200px;
    .item{
      cursor: pointer;
      width: 92px;
      height: 92px;
      display: block;
      float: left;
      border-radius: 6px;
      overflow: hidden;
      border: 2px solid #fff;
      box-shadow: 0 4px 8px rgba(34, 62, 89, .5);
      margin: 3px 0 0 3px;
      img{
        width: 100%;
        height: 100%;
        background: white;
      }
    }
  }
}
</style>
