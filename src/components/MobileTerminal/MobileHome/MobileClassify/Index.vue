<template>
  <div id="mobile_classify" v-title data-title="AH5 GAMES">
    <StartAndEnd>
      <div>
        <ClassList :gameTypeList="gameTypeList"></ClassList>
        <BottomList :typeList="typeList"></BottomList>
        <BottomText></BottomText>
      </div>
    </StartAndEnd>
  </div>
</template>

<script>
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import BottomList from "@/components/MobileTerminal/MobileHome/BottomList";
import BottomText from "@/components/MobileTerminal/MobileHome/BottomText";
import ClassList from "@/components/MobileTerminal/MobileHome/ClassList";
import shooting from '@/assets/01shooting.jpg';
import car from '@/assets/02car.jpg';
import ball from '@/assets/03ball.jpg';
import girls from '@/assets/04girls.jpg';
import casual from '@/assets/05casu.jpg';
import puzzle from '@/assets/06puzzle.jpg';
import action from '@/assets/07action.jpg';
import racing from '@/assets/08racing.jpg';
import parkour from '@/assets/09parkour.jpg';
import sand from '@/assets/093d.jpg';
import { determinePcOrMove, getGameType, getGameList } from '@/utils/utils.js'
export default {
  name: "mobileClassifyIndex",
  components: {
    BottomList,BottomText,StartAndEnd,ClassList
  },
  data() {
    return {
      shooting,
      car,
      ball,
      girls,
      casual,
      puzzle,
      action,
      racing,
      parkour,
      sand,
      gameTypeList: [],
      typeList: [],
    }
  },
  created() {
    const { query } = this.$route
    const { gameType } = query || {}
    if (determinePcOrMove() == 2) {
      this.$router.push({
        path: '/P/gameType',
        query: {
          gameType
        }
      },()=>{})
    }
  },
  mounted() {
    this.getGameList1()
    window.addEventListener("scroll",this.handleScroll, true)
    // 获取游戏分类
    getGameType().then((res)=>{
      const { data } = res || {}
      const { code, data:dataObj } = data || {}
      const { game_type } = dataObj || {}
      if (code == 1) {
        game_type && game_type.map(()=>{
          game_type[0].iconUrl = this.shooting
          game_type[1].iconUrl = this.car
          game_type[2].iconUrl = this.ball
          game_type[3].iconUrl = this.girls
          game_type[4].iconUrl = this.casual
          game_type[5].iconUrl = this.puzzle
          game_type[6].iconUrl = this.action
          game_type[7].iconUrl = this.racing
          game_type[8].iconUrl = this.parkour
          game_type[9].iconUrl = this.sand
        })
        this.typeList = game_type
      } else {
        this.$message.error('获取游戏类别失败')
      }
    }).catch((err)=>{
      console.log(err);
    })
  },
  methods: {
    handleScroll() {
      // console.log(document.getElementById('mobile_classify').scrollTop);
    },
    getGameList1() {
      document.getElementById('mobile_classify').scrollTop = 0
      const { query } = this.$route
      const { gameType } = query || {}
      // 获取游戏列表
      getGameList(gameType).then((res)=>{
        console.log(res);
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        if (code == 1) {
          this.gameTypeList = dataObj || []
        } else {
          this.$message.error('数据加载失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  },
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      this.getGameList1()
    }
  }
}
</script>

<style lang="less" scoped>
#mobile_classify{
  height: 100vh;
  overflow-y: auto;
}
</style>
