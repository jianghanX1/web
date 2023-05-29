<template>
  <div>
    <div class="nav-bar" :style="bottomHide == false ? 'position: relative' : null">
      <div><a :href="'/#/M/homeIndex'">AH5 GAMES</a></div>
    </div>
    <slot></slot>
    <div class="end" v-if="bottomHide == false ? false : true">
      <a @click="privacyClick">Privacy</a>
      <a @click="contactClick">Contact us</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartAndEnd",
  props: ["bottomHide"],
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.bottomHide);
  },
  methods: {
    game() {
      // this.$router.push({
      //   path: '/M/homeIndex'
      // },()=>{})
    },
    privacyClick() {
      let pathInfo = this.$router.resolve({
        path: '/privacy',
        query: {
          routeType: 1, // 不走App.vue文件的判断
        }
      })
      window.open(pathInfo.href, '_blank')
    },
    contactClick() {
      let pathInfo = this.$router.resolve({
        path: '/contactUs',
        query: {
          routeType: 1, // 不走App.vue文件的判断
        }
      })
      window.open(pathInfo.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar{
  height: 2.8125rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 0.125rem 0.1875rem 0 rgba(0,16,63,.4);
  background-color: #f83123;
  z-index: 5;
  div{
    font-size: 1.125rem;
    text-align: center;
    line-height: 2.8125rem;
    color: #ffffff;
    font-weight: bold;
    a{
      text-decoration: none;
      color: #ffffff;
    }
  }
}
.end{
  margin-top: 1rem;
  height: 1.75rem;
  background-color: #042697;
  text-align: center;
  color: #fff;
  font-size: .5625rem;
  line-height: 1.75rem;
  overflow: hidden;
  a {
    text-decoration: none;
  }
}
.end>a:not(:last-child) {
  margin-right: 1rem;
}
.end>a {
  color: #fff;
  position: relative;
}
.end>a:not(:last-child):before {
  content: "";
  height: 0.8125rem;
  width: 0.0625rem;
  background-color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -0.65rem;
}
</style>
