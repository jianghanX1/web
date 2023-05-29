<template>
  <div>
    <div class="app-list" v-for="(item,index) in appGameList" :key="index">
      <div class="app-list-content">
        <div class="content-top">
          <div class="item" v-if="item[0] && item[0].iconUrl"><a :href="'/#/M/details?gameId='+item[0].gameId"><img v-lazy="item[0] && item[0].iconUrl" alt=""></a></div>
          <div class="item" v-if="item[1] && item[1].iconUrl"><a :href="'/#/M/details?gameId='+item[1].gameId"><img v-lazy="item[1] && item[1].iconUrl" alt=""></a></div>
          <div class="item" v-if="item[2] && item[2].iconUrl"><a :href="'/#/M/details?gameId='+item[2].gameId"><img v-lazy="item[2] && item[2].iconUrl" alt=""></a></div>
        </div>
        <div class="content-middle" v-if="(index + 1) % 2 !== 0">
          <div class="middle-left" v-if="item[3] && item[3].iconUrl">
            <div class="item"><a :href="'/#/M/details?gameId='+item[3].gameId"><img v-lazy="item[3] && item[3].iconUrl" alt=""></a></div>
          </div>
          <div class="middle-right">
            <div class="item-box" v-if="item[4] && item[4].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[4].gameId"><img v-lazy="item[4] && item[4].iconUrl" alt=""></a></div></div>
            <div class="item-box" v-if="item[5] && item[5].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[5].gameId"><img v-lazy="item[5] && item[5].iconUrl" alt=""></a></div></div>
          </div>
          <div></div>
        </div>
        <div class="content-middle" v-if="(index + 1) % 2 === 0">
          <div class="middle-right">
            <div class="item-box" v-if="item[3] && item[3].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[3].gameId"><img v-lazy="item[3] && item[3].iconUrl" alt=""></a></div></div>
            <div class="item-box" v-if="item[4] && item[4].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[4].gameId"><img v-lazy="item[4] && item[4].iconUrl" alt=""></a></div></div>
          </div>
          <div class="middle-left2" v-if="item[5] && item[5].iconUrl">
            <div class="item"><a :href="'/#/M/details?gameId='+item[5].gameId"><img v-lazy="item[5] && item[5].iconUrl" alt=""></a></div>
          </div>
          <div></div>
        </div>
        <div class="content-top">
          <div class="item" v-if="item[6] && item[6].iconUrl"><a :href="'/#/M/details?gameId='+item[6].gameId"><img v-lazy="item[6] && item[6].iconUrl" alt=""></a></div>
          <div class="item" v-if="item[7] && item[7].iconUrl"><a :href="'/#/M/details?gameId='+item[7].gameId"><img v-lazy="item[7] && item[7].iconUrl" alt=""></a></div>
          <div class="item" v-if="item[8] && item[8].iconUrl"><a :href="'/#/M/details?gameId='+item[8].gameId"><img v-lazy="item[8] && item[8].iconUrl" alt=""></a></div>
        </div>
        <div class="content-bottom">
          <div class="item-box" v-if="item[9] && item[9].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[9].gameId"><img v-lazy="item[9] && item[9].iconUrl" alt=""></a></div></div>
          <div class="item-box" v-if="item[10] && item[10].iconUrl"><div class="item"><a :href="'/#/M/details?gameId='+item[10].gameId"><img v-lazy="item[10] && item[10].iconUrl" alt=""></a></div></div>
        </div>
      </div>
      <div class="adv" v-if="index === 0">
        <h6 class="adv-title">Advertisement</h6>
        <div>
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-9846530703102193"
               data-ad-slot="3863460797"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppList",
  props: ['appGameList'],
  data() {
    return {

    }
  },
  mounted() {
    setTimeout(()=>{
      window.addAds()
    },1300)
  },
  methods: {
    // detailsClick(item) {
    //   this.$router.push({
    //     path: '/M/details',
    //     query: {
    //       gameId: item.gameId
    //     }
    //   },()=>{})
    // }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.app-list{
  margin-top: 0.5625rem;
  .app-list-content{
    padding: 0 0.625rem;
    .content-top{
      width: 100%;
      box-sizing: border-box;
      .item{
        float: left;
        width: 5.875rem;
        height: 5.875rem;
        border-radius: 0.875rem;
        overflow: hidden;
        border: 2px solid #fff;
        img{
          width: 100%;
          height: 100%;
          background: white;
        }
      }
      .item:not(:last-child){
        margin-right: 0.561rem;
      }
    }
    .content-top:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .content-middle{
      margin-top: 0.5625rem;
      margin-bottom: 0.5625rem;
      .middle-left{
        float: left;
        margin-right: 0.561rem;
        width: 12.3125rem;
        height: 12.3125rem;
        .item{
          width: 100%;
          height: 100%;
          border-radius: 0.875rem;
          overflow: hidden;
          border: 2px solid #fff;
          img{
            width: 100%;
            height: 100%;
            background: white;
          }
        }
      }
      .middle-left2{
        float: left;
        margin-left: 0.561rem;
        width: 12.3125rem;
        height: 12.3125rem;
        .item{
          width: 100%;
          height: 100%;
          border-radius: 0.875rem;
          overflow: hidden;
          border: 2px solid #fff;
          img{
            width: 100%;
            height: 100%;
            background: white;
          }
        }
      }
      .middle-right{
        float: left;
        .item-box{
          width: 5.875rem;
          height: 5.875rem;
          display: block;
          position: relative;
          background-color: #fff;
          box-shadow: 0 0.125rem 0.375rem 0 rgba(0,0,0,.6);
          border-radius: 0.875rem;
          .item{
            width: 100%;
            height: 100%;
            border-radius: 0.875rem;
            overflow: hidden;
            border: 2px solid #fff;
            img{
              width: 100%;
              height: 100%;
              background: white;
            }
          }
        }
        .item-box:not(:first-child){
          margin-top: 0.5625rem;
        }
      }
    }
    .content-middle:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .content-bottom{
      margin-top: 0.5625rem;
      .item-box{
        float: left;
        width: 9.0625rem;
        height: 9.0625rem;
        display: block;
        position: relative;
        background-color: #fff;
        box-shadow: 0 0.125rem 0.375rem 0 rgba(0,0,0,.6);
        border-radius: 0.875rem;
        .item{
          width: 100%;
          height: 100%;
          border-radius: 0.875rem;
          overflow: hidden;
          border: 2px solid #fff;
          img{
            width: 100%;
            height: 100%;
            background: white;
          }
        }
      }
      .item-box:not(:first-child){
        margin-left: 0.624rem;
      }
    }
    .content-bottom:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .adv{
    margin-top: 0.5625rem;
    .adv-title{
      background-color: #f7f7f7;
      line-height: 1.4375rem;
      font-size: .8125rem;
      color: #333;
      text-align: center;
    }
  }
}
</style>
