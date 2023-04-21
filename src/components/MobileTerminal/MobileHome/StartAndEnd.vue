<template>
  <div>
    <div class="nav-bar">
      <div @click="game">GAMES</div>
    </div>
    <slot></slot>
    <div class="end">
      <a href="/static/mobile/html/terms_of_service.html" target="_blank">Terms &amp; Conditions</a>
      <a href="/static/mobile/html/privacy_policy.html" target="_blank">Privacy</a>
      <a href="/static/mobile/html/cookies_policy.html" target="_blank">Cookies</a>
      <a href="/static/mobile/html/contact.html" target="_blank">Contact us</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartAndEnd",
  methods: {
    game() {
      this.$router.push({
        path: '/M/homeIndex'
      })
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
  z-index: 1;
  div{
    font-size: 1.125rem;
    text-align: center;
    line-height: 2.8125rem;
    color: #ffffff;
    font-weight: bold;
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
