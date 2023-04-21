<template>
  <StartAndEnd>
    <div>
      <TopBox :topGameList="topGameList"></TopBox>
      <AppList :appGameList="appGameList"></AppList>
      <BottomList :typeList="gameTypeList"></BottomList>
      <BottomText></BottomText>
    </div>
  </StartAndEnd>
</template>

<script>
import StartAndEnd from "@/components/MobileTerminal/MobileHome/StartAndEnd";
import TopBox from "@/components/MobileTerminal/MobileHome/TopBox";
import AppList from "@/components/MobileTerminal/MobileHome/AppList";
import BottomList from "@/components/MobileTerminal/MobileHome/BottomList";
import BottomText from "@/components/MobileTerminal/MobileHome/BottomText";

import img1 from '@/assets/gameType01.jpg'
import img2 from '@/assets/gameType02.jpg'

import { getGameList, determinePcOrMove, getGameType } from '@/utils/utils.js'
export default {
  name: "index",
  data() {
    return {
      topGameList: [], // 移动端头部游戏列表
      appGameList: [], // 中间游戏列表
      gameTypeList: [], // 底部游戏类型
      img1,img2
    }
  },
  components: {
    StartAndEnd,TopBox,AppList,BottomList,BottomText
  },
  created() {
    if (determinePcOrMove() == 2) {
      this.$router.push({
        path: '/P/homeIndex'
      })
    }
  },
  mounted() {
    getGameList().then((res)=>{
      console.log(res);
      const { data } = res || {}
      const { code, data:dataObj } = data || {}
      if (code == 1) {
        let arr = dataObj || [] // 原数组
        this.topGameList = arr.splice(0,5) // 头部五条数据
        let newArr = [] // 新数组
        let num = Math.ceil(arr.length / 11)
        for ( let i = 1; i <= num; i++ ) {
          newArr[i - 1] = arr.splice(0,11)
        }
        console.log(newArr);
        this.appGameList = newArr
      }
    }).catch((err)=>{
      console.log(err);
    })
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
        this.gameTypeList = game_type
      } else {
        this.$message.error('获取游戏类别失败')
      }
    }).catch((err)=>{
      console.log(err);
    })
  },
}
</script>

<style scoped>

</style>
