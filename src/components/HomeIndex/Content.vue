<template>
  <div class="big-box">
    <div class="item" @click="iconClick(item)" v-for="(item,index) in gameList" :key="index">
      <div class="item_position">
        <img v-lazy="item.iconUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { getGameList } from '@/utils/utils.js'
export default {
  name: "contentIndex",
  data() {
    return {
      gameList: [], // 游戏列表
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const { query } = this.$route
      const { gameType, searchValue } = query || {}
      getGameList(gameType).then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          if (searchValue) {
            let arr = []
            let newArr = []
            dataObj && dataObj.map((item)=>{
              if (item.gameName.includes(`${searchValue}`)) {
                arr.push(item)
              }
              newArr.push(item)
            })
            if (arr.length) {
              this.gameList = arr || []
            } else {
              this.gameList = newArr.splice(0,30)
            }
          } else {
            this.gameList = dataObj
          }
        } else {
          this.$message.error('数据加载失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
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
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
  .big-box{
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
    @keyframes example {
      0%  {transform: scale(1);}
      35%  {transform: scale(1.2);}
      65% {transform: scale(1.1);}
      100% {transform: scale(1.3);}
    }
    .item:hover{
      cursor: pointer;
      animation-name: example;
      animation-duration: 0.6s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: forwards;
      animation-play-state: running;
      .item_position{
        z-index: 23;
      }
    }

    .item{
      float: left;
      padding: 10px;
      box-sizing: border-box;
      .item_position{
        padding-top: 100%;
        width: 100%;
        position: relative;
        height: 0;
        z-index: -1;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          border: 2px solid #fff;
          background: white;
        }
      }
    }
  }
  .big-box:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
  }
  @media screen and (min-width: 1201px){
    .item {
      width: 11%;
    }
  }
  @media screen and (min-width: 1081px) and (max-width: 1200px){
    .item {
      width: 12.5%;
    }
  }
  @media screen and (min-width: 961px) and (max-width: 1080px){
    .item {
      width: 14.2%;
    }
  }
  @media screen and (min-width: 841px) and (max-width: 960px){
    .item {
      width: 16.6%;
    }
  }
  @media screen and (min-width: 721px) and (max-width: 840px){
    .item {
      width: 20%;
    }
  }
  @media screen and (max-width: 720px){
    .item {
      width: 20%;
    }
  }
</style>
