<template>
  <StartAndEnd>
    <div>
      <ClassList :gameTypeList="gameTypeList"></ClassList>
      <BottomList :typeList="typeList"></BottomList>
      <BottomText></BottomText>
    </div>
  </StartAndEnd>
</template>

<script>
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import BottomList from "@/components/MobileTerminal/MobileHome/BottomList";
import BottomText from "@/components/MobileTerminal/MobileHome/BottomText";
import ClassList from "@/components/MobileTerminal/MobileHome/ClassList";
import img1 from '@/assets/gameType01.jpg'
import img2 from '@/assets/gameType02.jpg'
import { determinePcOrMove, getGameType, getGameList } from '@/utils/utils.js'
export default {
  name: "index",
  components: {
    BottomList,BottomText,StartAndEnd,ClassList
  },
  data() {
    return {
      img1,img2,
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
      })
    }
  },
  mounted() {
    this.getGameList1()

    // 获取游戏分类
    getGameType().then((res)=>{
      const { data } = res || {}
      const { code, data:dataObj } = data || {}
      const { game_type, game_grade } = dataObj || {}
      if (code == 1) {
        game_type && game_type.map((item,index)=>{
          if (index % 2 == 0) {
            item.iconUrl = this.img1
          } else {
            item.iconUrl = this.img2
          }
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
    getGameList1() {
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

</style>
