<template>
  <div class="top-box">
    <div class="item" v-for="(item,index) in topGameList" :key="index">
      <a :href="'/#/M/details?gameId='+item.gameId"><img v-lazy="item.iconUrl" alt=""></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBox",
  props: ['topGameList'],
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
.top-box{
  padding: 0 0.625rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 3.375rem;
  .item{
    box-sizing: border-box;
    width: 3.4375rem;
    height: 3.4375rem;
    border-radius: 0.375rem;
    overflow: hidden;
    border: 2px solid #fff;
    box-shadow: 0 0.125rem 0.375rem 0 rgb(0 0 0 / 60%);
    img{
      width: 100%;
      height: 100%;
      background: white;
    }
  }
}
</style>
