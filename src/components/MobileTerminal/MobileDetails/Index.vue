<template>
  <div v-title :data-title="gameName + ' - ' + 'Play' + ' ' + gameName + ' Online at ah5game.com'">
    <div class="mobile-details" :style="playValue ? {display: 'none'} : {display: 'block'}" id="mobile-details">
      <StartAndEnd :bottomHide="false">
      <div class="details-top-box" :style="playValue1 ? {display: 'none'} : {display: 'block'}">
        <div class="app-base">
          <div class="app-pic"><img :src="iconUrl" alt=""></div>
          <div class="app-info">
            <div class="app-name">{{ gameName }}</div>
<!--            <div class="app-btns">-->
<!--              <div class="app-collection">-->

<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
        <button class="app-play" @click="playClick">
          <div class="play-fill"></div>
        </button>
      </div>
      <div class="details-seo-box" :style="playValue1 ? {display: 'none'} : {display: 'block'}">
        <div class="desc-item">
          <div class="desc-title">{{ gameName }}</div>
          <div class="desc-text">{{ description }}</div>
        </div>
        <div class="seo-tags">
          <a class="seo-tag" :style="index % 2 == 0 ? 'color: #f5b417' : index % 3 == 0 ? 'color: #54abd7' : 'color: #ff6215'" v-for="(item,index) in typeList" :key="index" @click="classClick(item.code)">{{ item.name }}</a>
        </div>
      </div>
      <div class="adv">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9846530703102193"
             data-ad-slot="4218684011"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      <div class="details-recommend-box" :style="playValue1 ? {display: 'none'} : {display: 'block'}">
        <p class="recommend-title">Recommendations for similar games</p>
        <div class="recommend-list">
          <ClassList styleType="1" :gameTypeList="gameTypeList"></ClassList>
        </div>
      </div>
      </StartAndEnd>
    </div>
    <div class="app-module" :style="playValue ? {display: 'block'} : {display: 'none'}" v-if="playValue">
      <div class="app-iframe">
        <div class="iframe-box">
          <iframe id="gameIframe" :src="playUrl" width="100%" height="100%"></iframe>
        </div>
        <div class="iframe-back" @click="backClick"><i class="el-icon-arrow-left"></i></div>
      </div>
      <div class="app-promote">
        <div class="promote-list">
          <div class="item" @click="detailsClick()" v-for="(item,index) in gameShuffleList" :key="index"><a :href="'/#/M/details?gameId='+item.gameId+'&jiaocha=1'"><img :src="item.iconUrl" alt=""></a></div>
        </div>
      </div>
    </div>
    <div class="is-top" :style="isTop ? {display: 'block'} : {display: 'none'}" @click="isTopClick">
      <i class="el-icon-top"></i>
    </div>
  </div>
</template>
<script>
import ClassList from "@/components/MobileTerminal/MobileHome/ClassList";
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import {getGameInfo, getGameList, shuffle, determinePcOrMove, getGameType, setMeta} from "@/utils/utils";
import { show_newAfg_preroll } from '../../../../ah5sdk';
export default {
  name: "mobileDetailsIndex",
  components: {
    ClassList,StartAndEnd
  },
  data() {
    return {
      gameName: '', // 游戏名称
      iconUrl: '', // 游戏icon
      description: '', // 游戏简介
      playUrl: '', // 游戏url
      typeList: [], // 游戏分类
      gameTypeList: [], // 游戏列表
      gameShuffleList: [], // 随机列表
      playValue: false,
      playValue1: false,
      isTop: false,
      timer: null, // 定时器
    }
  },
  created() {
    const { query } = this.$route
    const { gameId } = query
    if (determinePcOrMove() == 2) {
      this.$router.push({
        path: '/P/details',
        query: {
          gameId
        }
      },()=>{})
    }
  },
  mounted() {
    setTimeout(()=>{
      window.addAds()
    },800)
    document.getElementById('mobile-details').addEventListener("scroll",this.handleScroll, true)
    this.getInfo()
  },
  methods: {
    // 跳转分类
    classClick(gameType) {
      this.$router.push({
        path: '/M/gameType',
        query: {
          gameType
        }
      },()=>{})
    },

    // 获取游戏详情
    getInfo() {
      this.playValue1= true
      const { query } = this.$route
      const { gameId } = query || {}
      // 获取游戏详情
      getGameInfo(gameId).then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { gameName, iconUrl, description, playUrl, gameType } = dataObj || {}
        if (code == 1) {
          this.gameName = gameName
          this.iconUrl = iconUrl
          this.description = description
          this.playUrl = playUrl

          setMeta(`${gameName},${gameName} Online,${gameName} for free`,`${gameName} is a ${gameType} Games`)
          this.getGameType1(gameType)
        }
      }).catch((err)=>{
        this.playValue1= false
        console.log(err);
      })
    },
    // 获取游戏类型
    getGameType1(gameType) {
      getGameType().then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { game_type } = dataObj || {}
        if (code == 1) {
          this.typeList = game_type
          game_type.map((item)=>{
            if (item.name == gameType) {
              this.getGameTypeList(item.code)
            }
          })
        } else {
          this.playValue1= false
          this.$message.error('获取游戏类别失败')
        }
      }).catch((err)=>{
        this.playValue1= false
        console.log(err);
      })
    },

    // 获取游戏列表
    getGameTypeList(gameType) {
      // 获取游戏列表
      getGameList(gameType).then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          this.playValue1= false
          this.gameTypeList = dataObj || []
        } else {
          this.$message.error('数据加载失败')
        }
      }).catch((err)=>{
        this.playValue1= false
        console.log(err);
      })
    },
    handleScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop = document.getElementById('mobile-details').scrollTop
      // console.log(scrollTop);
      if (scrollTop > 0) {
        this.isTop = true
      } else {
        this.isTop = false
      }
    },
    // 置顶
    isTopClick () {
      document.getElementById('mobile-details').scrollTop = 0
    },
    // 开始游戏
    playClick() {
      // 广告
      show_newAfg_preroll().show_newAfg_preroll()

      this.playValue = true
      let arr = []
      this.gameTypeList.map((item)=>{
        arr.push(item)
      })
      this.gameShuffleList = arr.splice(0,5)
      clearInterval(this.timer)
      this.timer = setInterval(()=>{
        let newArr = []
        this.gameTypeList.map((item)=>{
          newArr.push(item)
        })
        let shuffleArr = shuffle(newArr) || []
        this.gameShuffleList = shuffleArr.splice(0,5)
      },10000)
    },
    // 返回
    backClick() {
      this.playValue = false
      clearInterval(this.timer)
    },
    // 跳转详情
    detailsClick() {
      // this.$router.push({
      //   path: '/M/details',
      //   query: {
      //     gameId: item.gameId
      //   }
      // },()=>{})
      this.playValue = false
    }
  },
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      this.getInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.mobile-details{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  z-index: 3;
  background-color: #0054ff;
  .nav-bar{
    height: 2.8125rem;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    box-shadow: 0 0.125rem 0.1875rem 0 rgba(0,16,63,.4);
    background-color: #f83123;
    z-index: 1;
    div{
      font-size: 1.125rem;
      text-align: center;
      line-height: 2.8125rem;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .details-top-box{
    //margin-top: 3.5625rem;
    margin-top: 0.75rem;
    .app-base:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .app-base{
      display: flex;
    }
    .app-pic{
      margin-left: 0.625rem;
      border: 2px solid #fff;
      border-radius: 0.625rem;
      overflow: hidden;
      min-width: 4.75rem;
      max-width: 4.75rem;
      height: 4.75rem;
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .app-info{
      padding-top: 0.5rem;
      margin-left: 0.9375rem;
      .app-name{
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        word-break: break-all;
      }
      .app-btns{
        margin-top: 0.6875rem;
        .app-collection{
          float: left;
          width: 1.625rem;
          height: 1.625rem;
          border-radius: 0.3125rem;
          background-color: #f09;
          position: relative;
          border: 0.125rem solid #fff;
        }
      }
      .app-btns:after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
    }
    .app-play{
      margin: 0.6rem auto 0;
      width: 18.75rem;
      border-radius: 0.625rem;
      border: 0.125rem solid #fff;
      height: 2.625rem;
      position: relative;
      display: block;
      overflow: hidden;
      background-color: #ccc;
      .play-fill{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #f09;
        max-width: 100%;
        transition: width .5s linear;
        z-index: 1;
      }
    }
    .app-play:before {
      content: "Play Now";
      font-size: .9375rem;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      color: #fff;
      z-index: 2;
    }
    .app-play:after{
      content: "";
      border-color: transparent transparent transparent #fff;
      border-style: solid;
      border-width: 0.58125rem 1.04rem;
      width: 0;
      height: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 3rem;
      animation-duration: 0.3s;
      animation-timing-function: ease;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: normal;
      animation-fill-mode: none;
      animation-play-state: running;
      animation-name: playAmt;
      z-index: 3;
    }
    @keyframes playAmt {
      0%  {left: 3rem;}
      35% {left: 3.3rem;}
      65% {left: 3.8rem;}
      100% {left: 4rem;}
    }
  }
  .details-seo-box{
    box-sizing: border-box;
    margin: 0.7rem auto 0;
    width: 18.75rem;
    border-radius: 0.3125rem;
    background-color: rgba(0,0,0,.2);
    max-height: 9.375rem;
    overflow: auto;
    padding: 0 0.625rem;
    .desc-item{
      padding-top: 0.625rem;
      .desc-title{
        color: #fff;
        font-size: .9375rem;
      }
      .desc-text{
        margin-top: 0.625rem;
        font-size: .75rem;
        color: #dde5ff;
        word-wrap: break-word;
        word-break: break-word;
      }
    }
    .seo-tags {
      padding-top: 0.625rem;
      .seo-tag{
        float: left;
        margin-right: 0.5rem;
        padding: 0.3rem 0.4375rem;
        font-size: .625rem;
        color: #fff;
        border-radius: 0.125rem;
        margin-bottom: 0.5rem;
        line-height: 1;
        background-color: #fff;
      }
    }
    .seo-tags:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .adv{
    margin: 0.75rem auto 0;
  }
  .details-recommend-box{
    margin-top: 0.875rem;
    padding: 0 0.625rem;
    .recommend-title{
      color: #fff;
      font-size: .9375rem;
    }
    .recommend-list{
      margin-top: 0.625rem;
    }
  }
}
.app-module {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: #0b2167;
  overflow: hidden;
  .app-iframe{
    width: 100%;
    height: calc(100vh - 4.375rem);
    .iframe-box{
      width: 100%;
      height: 100%;
      padding: 0 2px 2px 0;
      box-sizing: border-box;
      #gameIframe{
        border: 1px solid #cccccc;
      }
    }
  }
}
.is-top{
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  position: fixed;
  bottom: 5.375rem;
  right: 0.625rem;
  box-shadow: 0.125rem 0 0.3125rem rgb(0 0 0/30%);
  border-radius: 50%;
  background: #ffffff;
  z-index: 3;
  text-align: center;
  /deep/.el-icon-top{
    font-size: 1.5rem;
    line-height: 2.5rem;
  }
}
@media screen and (orientation: portrait){
  .app-iframe {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
    .iframe-back{
      position: absolute;
      left: 0;
      top: 1.125rem;
      box-shadow: 0 0.125rem 0 0.0625rem rgb(52 126 223);
      border-radius: 0 1.125rem 1.125rem 0;
      overflow: hidden;
      width: 3.375rem;
      height: 2.1875rem;
      background-color: #589df7;
      text-align: center;
      /deep/ .el-icon-arrow-left{
        font-size: 2rem;
        color: #ffffff;
        line-height: 2.1875rem;
      }
    }
  }
  .app-promote {
    height: 4.375rem;
    overflow: hidden;
    background-color: #0073dd;
    padding: 0.5rem 0;
  }
  .app-promote .promote-list {
    white-space: nowrap;
    overflow: hidden;
    font-size: 0;
  }
  .app-promote .promote-list .item{
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    margin-left: 0.42rem;
    border-radius: 0.875rem;
    color: #333;
    overflow: hidden;
    background-color: #e4e4e4;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
@media screen and (orientation: landscape){
  .app-module{
    display: flex!important;
    flex-direction: row-reverse;
  }
  .app-iframe {
    width: calc(100vw - 4.375rem);
    height: 100%!important;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
    .iframe-back{
      text-align: center;
      position: absolute;
      left: 0;
      top: 0.633803rem;
      box-shadow: 0 0.0714rem 0 0.0357rem rgb(52 126 223);
      border-radius: 0 0.6429rem 0.6429rem 0;
      overflow: hidden;
      width: 1.9286rem;
      height: 1.25rem;
      background-color: #589df7;
      /deep/ .el-icon-arrow-left{
        font-size: 1rem;
        color: #ffffff;
        line-height: 1rem;
      }
    }
  }
  .app-promote {
    height: 100%;
    width: 2.353521rem;
    overflow: hidden;
    background-color: #0073dd;
  }
  .app-promote .promote-list {
    height: 100%;
    overflow: hidden;
  }
  .app-promote .promote-list .item{
    width: 1.971831rem;
    height: 1.971831rem;
    margin: 0.23rem auto 0;
    display: block;
    border-radius: 0.492958rem;
    overflow: hidden;
    font-size: .422535rem;
    color: #333;
    background-color: #e4e4e4;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
