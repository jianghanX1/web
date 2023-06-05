<template>
<div>
  <div v-if="determinePcOrMove == 2">
    <Navigation></Navigation>
    <div class="content">
      <div class="msg-404">
        <h4 class="msg-title">404</h4>
        <p class="not-found">Not Found</p>
        <p class="msg-text">Sorry, the page you requested does not exist on this site</p>
      </div>
      <div class="popular-games">
        <h6 class="title">The Most Popular Games</h6>
        <div class="games">
          <div class="item" @click="iconClick(item)" v-for="(item,index) in gameList" :key="index">
            <div class="item_position">
              <img v-lazy="item.iconUrl" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <BottomNav></BottomNav>
  </div>
  <div v-else>
    <StartAndEnd :bottomHide="false">
      <div class="m-content">
        <div class="msg-404">
          <h4 class="msg-title">404</h4>
          <p class="not-found">Not Found</p>
          <p class="msg-text">Sorry, the page you requested does not exist on this site</p>
        </div>
        <div class="adv">
          <ins class="adsbygoogle"
               style="display:block;min-height: 300px"
               data-ad-client="ca-pub-9846530703102193"
               data-ad-slot="9481870551"
               data-ad-format="true"
               data-full-width-responsive="true"></ins>
        </div>
        <div class="popular-games">
          <h6 class="title">The Most Popular Games</h6>
          <div class="games">
            <ClassList styleType="1" :gameTypeList="gameList"></ClassList>
          </div>
        </div>
      </div>
    </StartAndEnd>
  </div>
</div>
</template>

<script>
import Navigation from '../components/Navigation';
import BottomNav from '../components/BottomNav';
import ClassList from "@/components/MobileTerminal/MobileHome/ClassList";
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import {determinePcOrMove, getGameList, recentGame} from "@/utils/utils";
export default {
  name: "NotFound",
  components: {
    Navigation, BottomNav, ClassList, StartAndEnd
  },
  data() {
    return {
      gameList: [],
      determinePcOrMove: null
    }
  },
  mounted() {
    if (determinePcOrMove() == 1) {
      this.determinePcOrMove = 1
      setTimeout(()=>{
        window.addAds()
      },1300)
    } else {
      this.determinePcOrMove = 2
    }
    this.getList()
  },
  methods: {
    getList() {
      getGameList().then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          let newArr = []
          dataObj && dataObj.map((item)=>{
            newArr.push(item)
          })
          this.gameList = newArr.splice(0,30)
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    // 点击跳转详情
    iconClick(item) {
      recentGame(item)
      this.$router.push({
        path: '/P/details',
        query: {
          gameId: item.gameId
        }
      },()=>{})
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  .msg-404{
    padding-top: 42px;
    padding-bottom: 30px;
    background-color: rgba(0,0,0,.2);
    .msg-title{
      font-size: 146px;
      background-image: linear-gradient(180deg,#75ddff,#c1d8ff);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0.1875rem 0.1875rem 0.125rem hsl(0deg 0% 100%/20%);
      text-align: center;
      line-height: 1;
      font-weight: 400;
    }
    .not-found{
      margin-top: 22px;
      font-size: 26px;
      text-align: center;
      color: #fff;
    }
    .msg-text{
      margin-top: 28px;
      font-size: 20px;
      color: #dde5ff;
      text-align: center;
    }
  }
  .popular-games{
    margin-top: 32px;
    padding: 0 21px;
    .title{
      color: #fff;
      font-size: 30px;
    }
    .games{
      width: 100%;
      margin-top: 18px;
      box-sizing: border-box;
      //overflow: hidden;
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
  }
}
.m-content{
  .msg-404{
    padding-top: 2.3333rem;
    padding-bottom: 1.6666rem;
    background-color: rgba(0,0,0,.2);
    .msg-title{
      font-size: 8.1111rem;
      background-image: linear-gradient(180deg,#75ddff,#c1d8ff);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0.1875rem 0.1875rem 0.125rem hsl(0deg 0% 100%/20%);
      text-align: center;
      line-height: 1;
      font-weight: 400;
    }
    .not-found{
      margin-top: 1.2222rem;
      font-size: 1.4444rem;
      text-align: center;
      color: #fff;
    }
    .msg-text{
      margin-top: 1.5555rem;
      font-size: 1.1111rem;
      color: #dde5ff;
      text-align: center;
    }
  }
  .popular-games {
    margin-top: 0.875rem;
    padding: 0 0.625rem;
    .title {
      color: #fff;
      font-size: 0.9275rem;
    }
    .games{
      margin-top: 0.625rem;
    }
  }
}
</style>