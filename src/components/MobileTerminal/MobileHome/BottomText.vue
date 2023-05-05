<template>
  <div class="bottom-text">
    <div class="b-desc">
      <p class="bd-title">AH5 GAMES</p>
      <div class="bd-block">
        <p class="bd-block-title">Play online games on ah5game</p>
        <p class="bd-block-text"> is one of the best free sites for online games. All games are in real-time, which means you can run these interesting games directly in your browser without downloading, logging, or paying. Above all, all GAMES are free ! Everyone can play the lasted games and the best games for free!</p>
      </div>
      <div class="bd-block">
        <p class="bd-block-title">Game selection</p>
        <p class="bd-block-text"> devotes itself to provide games for all ages. For example, you can find fierce types of games such as shooting and driving. Also, there are casual brain-burning games like puzzle and decryption games. Not only that, MMORPGs, strategy, or games that require long hours of operation also can be your options. Besides, we provide a series of unique online games for children. Parents, please trust us, that our website is very faith worthy, 100% safe, and child-friendly.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomText"
}
</script>

<style lang="less" scoped>
.bottom-text{
  margin-top: 0.75rem;
  .b-desc{
    width: 18.75rem;
    margin: 0 auto;
    padding-top: 1.625rem;
    padding-bottom: 0.8125rem;
    background-color: rgba(0,0,0,.2);
    border-radius: 0.1875rem;
    .bd-title{
      font-size: 1rem;
      color: #fff;
      text-align: center;
      margin-bottom: 0.375rem;
    }
    .bd-block{
      margin-top: 1.125rem;
      .bd-block-title{
        margin-left: 0.75rem;
        font-size: .75rem;
        color: #fff;
        line-height: 1;
        font-weight: 700;
      }
      .bd-block-text{
        padding: 0 0.8125rem;
        margin-top: 0.5625rem;
        font-size: .625rem;
        color: #dde5ff;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-word;
        .bd-link{
          font-size: .625rem;
          color: #fff81a;
        }
        a{
          text-decoration: none;
        }
      }
    }
  }
}
</style>
