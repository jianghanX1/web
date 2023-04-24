<template>
  <div class="contact">
    <div :class="determinePcOrMove ==1 ? contact_us_M : contact_us">
      <h4>Contact Us</h4>
      <span>Drop us a line, we would like to hear from you!</span>
    </div>
  </div>
</template>

<script>
import { determinePcOrMove } from '@/utils/utils.js'
export default {
  name: "ContactUs",
  components: {
  },
  data() {
    return {
      determinePcOrMove: determinePcOrMove(),
      contact_us: ["contact_us"],
      contact_us_M: ["contact_us_M"]
    }
  }
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
  .contact_us_M{
    margin: 4rem auto 0;
    background-color: #fff;
    width: 16.875rem;
    padding: 1.75rem 1.1875rem .625rem;
    border-radius: 0.25rem;
    h4{
      font-size: 1.3125rem;
      color: #333;
      text-align: center;
    }
    span{
      margin-top: 0.75rem;
      font-size: .8125rem;
      color: #333;
      display: block;
      text-align: center;
    }
  }
}
</style>
