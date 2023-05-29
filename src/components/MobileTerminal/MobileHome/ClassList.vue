<template>
  <div class="class-box" :style="styleType ? {marginTop: 0} : null">
    <div class="class-list" :style="styleType ? {padding: 0} : null">
      <div class="class-item" v-for="(item,index) in gameTypeList" :key="index"><a :href="'/#/M/details?gameId='+item.gameId+'&jiaocha=1'"><img v-lazy="item.iconUrl" alt=""></a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassList",
  props: ["styleType",'gameTypeList'],
  data() {
    return {

    }
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
.class-box{
  margin-top: 3.7375rem;
  .class-list{
    padding: 0 0.625rem;
    .class-item{
      float: left;
      width: 5.875rem;
      height: 5.875rem;
      margin-bottom: 0.5625rem;
      background-color: #fff;
      border-radius: 0.875rem;
      box-shadow: 0 0.125rem 0.375rem 0 rgb(0 0 0/60%);
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.875rem;
        border: 2px solid #fff;
        background-color: #fff;
        color: #fff;
        overflow: hidden;
      }
    }
    .class-item:not(:nth-child(3n)){
      margin-right: 0.561rem;
    }
  }
  .class-list:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
