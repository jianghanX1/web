<template>
  <div class="end">
    <a @click="privacyClick">Privacy</a>
    <a @click="contactClick">Contact us</a>
  </div>
</template>

<script>
export default {
  name: "BottomNav",
  methods: {
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
.end{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
  cursor: pointer;
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
