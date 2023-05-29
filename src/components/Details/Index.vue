<template>
  <div class="details" v-title :data-title="gameInfo.gameName + ' - ' + 'Play' + ' ' + gameInfo.gameName + ' Online at ah5game.com'">
    <div class="main-center">
      <div class="main-game">
        <div class="game-part">
          <div class="game-container" :style="full">
            <iframe :src="gameInfo.playUrl ? gameInfo.playUrl : null" width="100%" height="100%" id="iframe"></iframe>
            <div class="close" :style="closeStyle" @click="closeClick"><i class="el-icon-close" /></div>
            <div class="flex-games" v-show="isBlock" :style="leftHideStyle">
              <div class="btns">
                <a href="javascript: void(0)" class="btn-left" @click="leftClick"><i class="el-icon-arrow-left" v-show="leftBtnType"></i><i class="el-icon-arrow-right" v-show="!leftBtnType"></i></a>
                <a href="javascript: void(0)" class="btn-top" v-show="topBtnType" @click="topClick"><i class="el-icon-arrow-up"></i></a>
                <a href="javascript: void(0)" class="btn-bottom" v-show="bottomBtnType" @click="bottomClick"><i class="el-icon-arrow-down"></i></a>
              </div>
              <div class="game-warp">
                <div class="game-list" :style="{transform: `translateY(${heightType}px)`}" id="game-list">
                  <div class="app-item" v-for="(item,index) in theSame" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
                </div>
              </div>
            </div>
          </div>
          <div class="game-bar">
            <div class="bar-app-icon"><img :src="gameInfo.iconUrl" alt=""><span>{{ gameInfo.gameName }}</span></div>
            <div class="bar-btns">
              <div class="download" v-if="$store.state.deferredPromptType" @click="addToDesktop"><span>Add to Desktop</span></div>
              <div class="play-tag" @click="getGameType1(gameInfo.gameType)"><span>Play {{ gameInfo.gameType }} Games</span></div>
              <div class="full-btn" @click="amplifyClick"><i class="el-icon-rank"></i></div>
            </div>
          </div>
        </div>
        <div class="game-rec">
          <div class="app-item" v-for="(item,index) in four" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
        </div>
      </div>
      <div class="main-waterfall">
        <div class="recommend-banner">
          <div class="app-item" v-for="(item,index) in five" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
        </div>
        <div class="game-list" v-if="six.length">
          <div class="app-item" v-for="(item,index) in six" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
          <div class="more-btn">
            <div v-if="intercept.length" @click="loadMoreGames">Load More Games</div>
          </div>
        </div>
      </div>
      <Bottom />
    </div>
    <div class="main-float">
      <div class="float-ads">
        <div class="ads-top">
          <div class="ads-title"></div>
          <div class="ads-container"></div>
        </div>
        <div class="ads-bottom" id="adsBottom">
          <div class="ads-title"></div>
          <div class="ads-container"></div>
        </div>
      </div>
      <div class="float-games">
        <div class="games-container">
          <div class="title">{{ gameTypeList[0] }}</div>
          <div class="game-warp">
            <div class="game-list">
              <div class="app-item" v-for="(item,index) in one" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
            </div>
          </div>
        </div>
        <div class="games-container">
          <div class="title">{{ gameTypeList[1] }}</div>
          <div class="game-warp">
            <div class="game-list">
              <div class="app-item" v-for="(item,index) in two" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
            </div>
          </div>
        </div>
        <div class="games-container" id="girlsGames">
          <div class="title">{{ gameTypeList[2] }}</div>
          <div class="game-warp">
            <div class="game-list">
              <div class="app-item" v-for="(item,index) in three" :key="index" @click="switchGame(item.gameId)"><img v-lazy="item.iconUrl" alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bottom from '@/components/HomeIndex/Bottom';
import { getGameList, determinePcOrMove, shuffle, getGameType, setMeta } from '@/utils/utils.js'
export default {
  name: "detailsIndex",
  components: {
    Bottom
  },
  data() {
    return {
      gameInfo: {}, // 游戏详情数据
      theSame: [], // 同详情游戏类型相同的游戏，大屏用到
      gameTypeList: [], // 左侧类型名称
      one: [], // 左侧类型数据
      two: [], // 左侧类型数据
      three: [], // 左侧类型数据
      four: [], // 右侧截取五个数据
      five: [], // 右侧截取八个数据
      six: [], // 右侧底部数据
      intercept: [], // 右侧截取后数据用来点击更多时截取30个与six合并
      gameList: [],
      full: null,
      fullStyle: {
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 999,
        background: '#0054ff'
      },
      closeStyle: null,
      isBlock: false, // 展示大屏广告状态
      leftHideType: false, // 大屏广告隐藏状态
      leftHideStyle: null, // 大屏广告隐藏样式
      heightType: 0, // 偏移量
      gameListValue: 0, // 滚动区域高度
      leftBtnType: true, // 侧按钮
      topBtnType: false, // 顶部按钮
      bottomBtnType: true, // 底部按钮
    }
  },
  created() {
    const { query } = this.$route
    const { gameId } = query || {}
    if (determinePcOrMove() == 1) {
      this.$router.push({
        path: '/M/details',
        query: {
          gameId
        }
      },()=>{})
    }
  },
  mounted() {
    let headdiv = document.getElementById("girlsGames");
    let adsBottom = document.getElementById("adsBottom");
    let nTop = headdiv.offsetTop;
    let adsBottomTop = adsBottom.offsetTop;
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      console.log(scrollTop);

      console.log(nTop);
      if (scrollTop > nTop) {
        headdiv.style.position = "fixed"
        headdiv.style.top = "10px"
      } else {
        headdiv.style.position="relative";
        headdiv.style.top = "0px"
      }
      if (scrollTop > adsBottomTop + 2) {
        adsBottom.style.position = "fixed"
        adsBottom.style.top = "10px"
      } else {
        adsBottom.style.position="relative";
        adsBottom.style.top = '0px'
      }
    }
    this.getGameType1()

  },
  methods: {

    addToDesktop() {
      console.log(this.$store.state.deferredPrompt);
      this.$store.state.deferredPrompt && this.$store.state.deferredPrompt.prompt();
      this.$store.commit("changePWA",{deferredPrompt: null,deferredPromptType: this.$store.state.deferredPromptType})
    },

    // 获取游戏类型
    getGameType1(gameType) {
      getGameType().then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { game_type } = dataObj || {}
        if (code == 1) {
          let oldArr = []
          game_type && game_type.map((item)=>{
            oldArr.push(item)
          })
          let arr = oldArr && oldArr.splice(0,3) || []
          if (gameType) {
            game_type && game_type.map((item)=>{
              if (item.name == gameType) {
                this.$router.push({
                  path: '/P/gameType',
                  query: {
                    gameType: item.code
                  }
                },()=>{})
              }
            })
            return
          }
          arr.map((item)=>{
            this.gameTypeList.push(item.name)
          })
          this.getList(arr)
        } else {
          this.$message.error('获取游戏类别失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    getList(arr) {
      const { query } = this.$route
      const { gameId } = query || {}
      getGameList().then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          // 随机打乱数组
          let shuffleArr = shuffle(dataObj)
          let one = []
          let two = []
          let three = []
          shuffleArr && shuffleArr.map((item)=>{
            if (item.gameType == arr[0].name) {
              one.push(item)
            }
            if (item.gameType == arr[1].name) {
              two.push(item)
            }
            if (item.gameType == arr[2].name) {
              three.push(item)
            }
          })
          // 截取五个放右边
          let newArr = []
          let gameInfo = {}
          let theSame = [] // 同类型游戏
          shuffleArr && shuffleArr.map((item)=>{
            if (item.gameId == gameId) {
              gameInfo = item
            }
            newArr.push(item)
          })
          shuffleArr && shuffleArr.map((item)=>{
            if (item.gameType == gameInfo.gameType) {
              theSame.push(item)
            }
          })
          this.theSame = theSame
          this.gameInfo = gameInfo
          this.one = one
          this.two = two
          this.three = three
          this.four = newArr.splice(0,5)
          this.five = newArr.splice(0,8)
          this.six = newArr.splice(0,30)
          this.intercept = newArr
          this.gameList = shuffleArr

          setMeta(`${gameInfo.gameName},${gameInfo.gameName} Online,${gameInfo.gameName} for free`,`${gameInfo.gameName} is a ${gameInfo.gameType} Games`)
          this.manifestIcon(gameInfo)
        } else {
          this.$message.error('数据加载失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    // 动态加载PWA图标
    manifestIcon(gameInfo) {
      let myDynamicManifest = {
        "short_name": "AH5 GAMES",
        "name": "AH5 GAMES",
        "start_url": `${window.location.href}`,
        "display": "standalone",
        "background_color": "#0054ff",
        "theme_color": "#080403",
        "icons": [
          {
            "src": `${gameInfo.iconUrl}`,
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": `${gameInfo.iconUrl}`,
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": `${gameInfo.iconUrl}`,
            "sizes": "512x512",
            "type": "image/png"
          },
        ]
      }
      const stringManifest = JSON.stringify(myDynamicManifest);
      const blob = new Blob([stringManifest], {type: 'application/json'});
      const manifestURL = URL.createObjectURL(blob);
      document.querySelector('#manifest').setAttribute('href', manifestURL)
    },
    // 点击加载更多
    loadMoreGames () {
      let six = this.six
      let intercept = this.intercept
      let interceptArr = intercept.splice(0,30)
      this.six = [...six,...interceptArr]
      this.intercept = intercept
    },
    // 切换游戏
    switchGame (gameId) {
      this.$router.push({
        path: '/P/details',
        query: {
          gameId
        }
      },()=>{})
    },
     // 点击放大游戏
    amplifyClick() {
      this.full = this.fullStyle
      this.closeStyle = {
        display: 'block',
        position: "absolute",
        right: "12px",
        top: "10px",
        zIndex: 50,
        fontSize: "32px",
        color: '#ffffff',
        cursor: 'pointer',
        background: '#FF9900',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        textAlign: 'center',
        lineHeight: '50px'
      }
      this.isBlock = true
      this.bottomBtnType = this.theSame.length > 8
      setTimeout(() => {
        this.gameListValue = document.getElementById('game-list').offsetHeight
        console.log(this.gameListValue);
      })
    },
    // 大屏点击关闭
    closeClick() {
      this.full = null
      this.closeStyle = null
      this.isBlock = false
    },
    // 大屏广告点击左侧隐藏
    leftClick() {
      this.leftBtnType = !this.leftBtnType
      this.leftHideType = !this.leftHideType
      this.leftHideStyle = this.leftHideType ? {
        left: '-110px'
      } : null
    },
    // 大屏广告点击顶部按键
    topClick() {
      this.heightType = this.heightType + 880
      if (this.heightType == 0) {
        this.topBtnType = false
        this.bottomBtnType = true
      }
    },
    // 大屏广告点击底部按键
    bottomClick() {
      this.heightType = this.heightType - 880
      if ((Math.abs(this.heightType) + 880) > this.gameListValue) {
        this.bottomBtnType = false
        this.topBtnType = true
      }
    }
  },
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      this.getGameType1()
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 1883px){
  .details {
    width: 1875px;
    position: relative;
    .main-center {
      margin-left: 520px;
      box-sizing: border-box;
    }
    .float-games .games-container {
      width: 520px;
    }
  }
  .float-games .games-container .game-list .app-item {
    margin-right: 6px;
  }
  .float-games .games-container .game-list .app-item:nth-child(4n) {
    margin-right: 0;
  }
}
@media screen and (min-width: 1755px) and (max-width: 1882px){
  .details{
    width: 1747px;
    position: relative;
  }
  .main-center {
    margin-left: 392px;
    box-sizing: border-box;
  }
  .float-games .games-container {
    width: 392px;
  }
}
@media screen and (min-width: 1627px) and (max-width: 1754px){
  .details{
    width: 1619px;
    position: relative;
    .main-center {
      margin-left: 264px;
      box-sizing: border-box;
    }
  }
  .float-games .games-container {
    width: 264px;
  }
}
@media screen and (min-width: 1499px) and (max-width: 1626px){
  .details{
    width: 1491px;
    position: relative;
    .main-center {
      margin-left: 136px;
      box-sizing: border-box;
    }
  }
  .float-games .games-container {
    width: 136px;
  }
}
@media screen and (max-width: 1498px){
  .float-games {
    display: none;
  }
}
@media screen and (min-width: 1363px) and (max-width: 1498px){
  .details{
    width: 1355px;
    position: relative;
  }
}
@media screen and (min-width: 1263px) and (max-width: 1362px){
  .details{
    width: 1255px;
    position: relative;
    .main-center {
      width: 955px;
      padding: 0 18px 0 5px;
      box-sizing: border-box;
      .recommend-banner .app-item:nth-of-type(1){
        display: none;
      }
      .game-list .app-item {
        float: left;
        margin-right: 13px;
      }
      .game-list .app-item:nth-child(7n) {
        margin-right: 0;
      }
    }
  }
}
@media screen and (min-width: 1363px){
  .main-center {
    width: 1055px;
    padding: 0 18px 0 5px;
    box-sizing: border-box;
  }
  .main-game .game-container {
    width: 900px;
    height: 570px;
    overflow: hidden;
    position: relative;
  }
  .main-waterfall .game-list .app-item {
    float: left;
    margin-right: 8px;
  }
  .main-waterfall .game-list .app-item:nth-child(8n) {
    margin-right: 0;
  }
}
@media screen and (max-width: 1362px){
  .main-game .game-container {
    width: 800px;
    height: 570px;
    overflow: hidden;
    position: relative;
  }
  .main-waterfall .game-list .app-item {
    float: left;
    margin-right: 8px;
  }
}
@media screen and (min-width: 1263px){
  .float-ads {
    display: block!important;
  }
}
@media screen and (max-width: 1262px){
  .main-center {
    width: 955px;
    padding: 0 18px 0 5px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .recommend-banner .app-item:nth-of-type(1){
    display: none!important;
  }
  .main-waterfall .game-list .app-item {
    float: left;
    margin-right: 13px;
  }
  .main-waterfall .game-list .app-item:nth-child(7n) {
    margin-right: 0;
  }
}
.details{
  margin: 10px auto 0;
  position: relative;
  #iframe{
    border: 1px solid #cccccc;
  }
  .main-game {
    margin-bottom: 13px;
    height: 632px;
    .game-part {
      float: left;
      .game-container {
        padding: 0 4px 4px 0;
        box-sizing: border-box;
        .close{
          display: none;
        }
        .flex-games{
          background-color: #9cd3ff;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          box-shadow: 6px 0 8px 0 rgba(0,0,0,.4);
          transition: all 1s;
          .btns{
            a{
              text-decoration: none;
            }
            .btn-left{
              width: 34px;
              height: 50px;
              background-color: #fc5632;
              top: 50%;
              transform: translateY(-50%);
              left: 100%;
              position: absolute;
              text-align: center;
              line-height: 50px;
              .el-icon-arrow-left,.el-icon-arrow-right{
                color: white;
                font-size: 20px;
              }
            }
            .btn-top{
              position: absolute;
              width: 100%;
              height: 30px;
              background-color: #fc5632;
              z-index: 2;
              text-align: center;
              line-height: 30px;
              .el-icon-arrow-up{
                color: white;
                font-size: 20px;
              }
            }
            .btn-bottom{
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 30px;
              background-color: #fc5632;
              z-index: 2;
              text-align: center;
              line-height: 30px;
              .el-icon-arrow-down{
                color: white;
                font-size: 20px;
              }
            }
          }
          .game-warp{
            height: 876px;
            padding: 10px 0;
            width: 110px;
            overflow: hidden;
            .game-list{
              transition: all 1s;
              .app-item{
                width: 94px;
                height: 94px;
                margin: 0 auto 16px;
                box-shadow: 0 6px 8px 0 rgba(0,0,0,.2);
                display: block;
                border-radius: 12px;
                overflow: hidden;
                position: relative;
                img{
                  width: 100%;
                  height: 100%;
                  border-radius: 12px;
                  border: 2px solid #fff;
                  overflow: hidden;
                  background: white;
                }
              }
            }
          }
        }
      }
      .game-bar{
        height: 60px;
        background-color: rgba(0,0,0,.3);
        padding-left: 6px;
        display: flex;
        justify-content: space-between;
        .bar-app-icon {
          margin-top: 6px;
          img{
            width: 48px;
            height: 48px;
            border-radius: 8px;
            overflow: hidden;
            background: white;
            vertical-align: middle;
          }
          span{
            font-size: 16px;
            color: white;
            margin-left: 8px;
            line-height: 45px;
          }
        }
        .bar-btns{
          margin-right: 10px;
          display: flex;
          .download {
            height: 40px;
            background-color: #3be6a2;
            border-radius: 8px;
            margin-top: 10px;
            margin-left: 12px;
            padding: 0 10px 0 8px;
            cursor: pointer;
            span{
              line-height: 40px;
              font-size: 16px;
              color: #fff;
            }
          }
          .play-tag{
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding: 0 12px;
            margin-top: 10px;
            border-radius: 8px;
            background-color: hsla(0,0%,100%,.2);
            margin-left: 12px;
            font-size: 13px;
            color: #fff;
            cursor: pointer;
          }
          .full-btn{
            width: 30px;
            height: 30px;
            display: block;
            background-color: transparent;
            margin-top: 15px;
            float: left;
            margin-left: 8px;
            position: relative;
            transform: rotate(45deg);
            cursor: pointer;
            /deep/ .el-icon-rank{
              font-size: 36px;
              color: #ffffff;
            }
          }
        }
      }
    }
    .game-rec {
      float: left;
      margin-left: 18px;
      .app-item{
        margin-bottom: 15px;
        width: 114px;
        height: 114px;
        padding: 2px 4px 4px 2px;
        box-sizing: border-box;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
          border-radius: 12px;
          border: 2px solid #fff;
          background: white;
        }
      }
    }
  }
  .main-waterfall {
    margin-bottom: 20px;
    .recommend-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      height: 122px;
    }
    .game-list{
      min-height: 300px;
      .more-btn {
        clear: both;
        padding-top: 10px;
        div{
          cursor: pointer;
          margin: 24px auto 0;
          background-color: #f83123;
          border-radius: 8px;
          height: 56px;
          width: 500px;
          color: #fff;
          font-size: 22px;
          text-align: center;
          display: block;
          box-shadow: 0 6px 8px 0 rgb(0 0 0/20%);
          line-height: 56px;
        }
      }
    }
  }
  .main-desc{
    margin: 18px auto 0;
    background-color: rgba(0,0,0,.15);
    padding: 28px 26px;
    word-break: break-word;
    word-wrap: break-word;
    border-radius: 10px;
  }
  .main-float {
    .float-ads{
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      .ads-top {
        margin-bottom: 2px;
        background-color: #f7f7f7;
        .ads-title{
          line-height: 30px;
          font-size: 16px;
          color: #333;
          text-align: center;
        }
        .ads-container {
          width: 300px;
          height: 250px;
        }
      }
      .ads-bottom {
        background-color: #f7f7f7;
        .ads-title{
          line-height: 30px;
          font-size: 16px;
          color: #333;
          text-align: center;
        }
        .ads-container {
          width: 300px;
          height: 600px;
        }
      }
    }
    .float-games {
      position: absolute;
      left: 0;
      top: 0;
      .games-container{
        .title{
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          background-color: #f83123;
        }
        .game-warp {
          padding: 2px 0 6px;
          background-color: rgba(0,0,0,.3);
          .game-list {
            padding: 6px 7px 0;
            height: 390px;
            overflow: hidden;
            .app-item {
              margin-bottom: 8px;
              float: left;
              img{
                background: white;
              }
            }
            .app-item:nth-child(2n-1){
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
  .app-item {
    width: 122px;
    height: 122px;
    display: block;
    overflow: hidden;
    margin-bottom: 10px;
    position: relative;
    padding: 2px 4px 4px 2px;
    box-sizing: border-box;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 12px;
      background: white;
    }
  }
  @keyframes example {
    0%  {transform: scale(1);}
    35%  {transform: scale(1.05);}
    65% {transform: scale(1.03);}
    100% {transform: scale(1.08);}
  }
  .app-item:hover{
    cursor: pointer;
    animation-name: example;
    animation-duration: 0.6s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    z-index: 1;
  }
}
</style>
