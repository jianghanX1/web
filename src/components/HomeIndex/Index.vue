<template>
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
</template>

<script>
import Content from '@/components/HomeIndex/Content';
import Bottom from '@/components/HomeIndex/Bottom';
import { getGameList, determinePcOrMove } from '@/utils/utils.js'
export default {
  name: "HomeIndex",
  components: {
    Content,
    Bottom
  },
  data() {
    return {
      recentGameList: []
    }
  },
  created() {
    if (determinePcOrMove() == 1) {
      this.$router.push({
        path: '/M/homeIndex'
      },()=>{})
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getGameList(1).then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          let arr = dataObj.splice(0,4)
          this.recentGameList = arr
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
  }
}
</script>

<style lang="less" scoped>
.big{
  display: flex;
  min-width: 730px;
  height: calc(100vh - 85px);
  overflow-y: auto;
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
