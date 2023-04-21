<template>
  <div class="contact">
    <div class="contact_us">
      <h4>Contact Us</h4>
      <span>Drop us a line, we would like to hear from you!</span>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav';
export default {
  name: "ContactUs",
  components: {
    BottomNav
  },
}
</script>

<style lang="less" scoped>
.contact{
  .contact_us{
    margin: 80px auto 0;
    background-color: #fff;
    width: 600px;
    padding: 52px 50px 30px;
    border-radius: 12px;
    h4{
      font-size: 42px;
      color: #333;
      text-align: center;
    }
    span{
      margin-top: 20px;
      font-size: 18px;
      color: #333;
      display: block;
      text-align: center;
    }
  }
}
</style>
