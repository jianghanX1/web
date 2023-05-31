<template>
  <div>
    <Navigation></Navigation>
    <Content></Content>
    <div class="new-games-bottom">
      <Bottom />
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import Navigation from '../Navigation';
import BottomNav from '../BottomNav';
import Content from '@/components/HomeIndex/Content';
import Bottom from '@/components/HomeIndex/Bottom';
import { determinePcOrMove } from '@/utils/utils.js'
export default {
  name: "gameIndex",
  components: {
    Content,Bottom,Navigation,BottomNav
  },
  created() {
    const { query } = this.$route
    const { gameType } = query || {}
    if (determinePcOrMove() == 1) {
      this.$router.push({
        path: '/M/gameType',
        query: {
          gameType
        }
      },()=>{})
    }
  },
  mounted() {
    document.title = 'AH5 GAMES'
  }
}
</script>

<style lang="less" scoped>
  .new-games-bottom{
    padding: 16px 60px 0;
  }
</style>
