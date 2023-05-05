<template>
    <div>
      <div class="bj">
        <div class="bj_left">
          <div class="title" @click="vigooGamesClick"><i class="el-icon-menu" @click.stop="positionMenuClick"></i> AH5 GAMES</div>
          <div class="nav-list">
            <div @click="newGamesClick(item.code)" v-for="(item,index) in gameTypeList" :key="index">{{ item.name }}</div>
          </div>
        </div>
        <div class="search">
          <el-input
            placeholder="Search Games"
            prefix-icon="el-icon-search"
            v-model="searchInput"
            @keyup.enter.native="searchClick"
          >
          </el-input>
        </div>
        <div class="position" :style="positionMenu ? 'display: block' : 'display: none'" @mouseleave="mouseleave">
          <div @click="newGamesClick(item.code)" v-for="(item,index) in gameTypeList" :key="index">{{ item.name }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { getGameType } from "@/utils/utils";
export default {
  name: 'navigationIndex',
  data () {
    return {
      searchInput: null,
      gameTypeList: [], // 游戏分类
      positionMenu: false, // 菜单展示
    }
  },
  mounted() {
    this.getGameType1()
  },
  methods: {
    // 搜索
    searchClick() {
      this.$router.push({
        path: '/P/gameType',
        query: {
          searchValue: this.searchInput.trim()
        }
      },()=>{})
    },
    positionMenuClick() {
      this.searchInput = null
      this.positionMenu = !this.positionMenu
      console.log(this.positionMenu);
    },
    mouseleave() {
      this.positionMenu = false
    },
    // 获取游戏类型
    getGameType1() {
      getGameType().then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { game_type } = dataObj || {}
        if (code == 1) {
          this.gameTypeList = game_type
        } else {
          this.$message.error('获取游戏类别失败')
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    vigooGamesClick() {
      this.searchInput = null
      this.$router.push({
        path: '/'
      },()=>{})
    },
    newGamesClick(gameType) {
      this.searchInput = null
      this.$router.push({
        path: '/P/gameType',
        query: {
          gameType,
          searchValue: null
        }
      },()=>{})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@media screen and (max-width: 1650px){
  .bj_left{
    .title{
      /deep/ .el-icon-menu{
        display: inline-block!important;
      }
    }
  }
}
  .bj{
    height: 56px;
    background: #f83123;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    position: relative;
    .position{
      position: absolute;
      top: 51px;
      left: 0;
      background: #f83123;
      padding: 6px 0;
      min-width: 184px;
      z-index: 99;
      div{
        height: 48px;
        line-height: 48px;
        padding: 0 12px;
      }
      div:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,.1);
      }
    }
    .bj_left{
      display: flex;
      .title{
        min-width: 166px;
        line-height: 56px;
        font-size: 22px;
        font-weight: bold;
        margin-left: 36px;
        cursor: pointer;
        .el-icon-menu{
          display: none;
        }
      }
      .nav-list{
        overflow: hidden;
        line-height: 56px;
        font-size: 18px;
        div{
          float: left;
          margin-left: 15px;
          padding: 0 15px;
        }
        div:hover{
          background-color: rgba(0,0,0,.1);
          border-top: 4px solid #fff81a;
          cursor: pointer;
        }
      }
    }
    .search{
      margin-right: 15px;
    }
  }

  /deep/ .el-input {
    width: 327px;
    margin-top: 7px;
  }
  /deep/ .el-input--prefix .el-input__inner{
    background: rgba(0,0,0,.3);
    border: 0;
    color: #f4d0ce;
    font-size: 16px;
  }
  /deep/ .el-input--prefix .el-input__inner:focus{
    background: #ffffff;
    border: 0;
    color: #333;
    font-size: 16px;
  }
</style>
