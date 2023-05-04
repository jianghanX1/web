<template>
  <div class="bottom-box">
    <div class="bj" v-if="titleType == 1">
      <div class="title">AH5 GAMES</div>
      <div class="small-title">Play online games on ah5game</div>
      <div class="text">
        ah5game.COM is one of the best free sites for online games. All games are in real-time, which means you can run these interesting games directly in your browser without downloading, logging, or paying. Above all, all ah5game GAMES are free ! Everyone can play the lasted games and the best games for free!
      </div>
      <div class="small-title">Game selection</div>
      <div class="text">
        ah5game devotes itself to provide games for all ages. For example, you can find fierce types of games such as shooting and driving. Also, there are casual brain-burning games like puzzle and decryption games. Not only that, MMORPGs, strategy, or games that require long hours of operation also can be your options. Besides, we provide a series of unique online games for children. Parents, please trust us, that our website is very faith worthy, 100% safe, and child-friendly.
        <br>
        Our most popular types of games:
        <br>
<!--        <a href="https://vigoo.com/t/en/vigoo/Shooting%20Games/" class="bd-link">Shooting Games</a>-->
        <br>
<!--        <a href="https://vigoo.com/t/en/vigoo/Driving%20Games/" class="bd-link">Driving Games</a>-->
      </div>
      <div class="small-title">Contact Us</div>
      <div class="text">E-mail: </div>
    </div>
    <div class="bj" v-if="titleType == 2">
      <div class="title">New Games</div>
      <div class="small-title">What is New Games?</div>
      <div class="text">
        New Games contains the latest games recently launched by ah5game, and collects the most popular new games. Different free new games are provided to players every day, and there are various game types, such as Gun Games, Shooting Games, Puzzle Games, Car Games, Action Games, Arcade Games, Girl Games, Kid Games, etc.
      </div>
    </div>
    <div class="bj" v-if="titleType == 3">
      <div class="title">AH5 Games</div>
      <div class="small-title">Role playing game</div>
      <div class="text">
        Role-play in the game, such as teachers, restaurant owners, chefs and other roles, complete different role tasks, and experience a diverse life!
      </div>
      <div class="small-title">Dress up game</div>
      <div class="text">
        The dress up game is divided into two series: costume and makeup. Dress up and clothing series games, you can choose clothes, bags, shoes and various accessories for the protagonist according to the game tasks and scenes. In the makeup series of games, you can choose various colors of eye shadow, lipstick, blush or nail polish for the protagonist to satisfy the girls' hearts.
      </div>
      <div class="small-title">Where are the most fun girls games?</div>
      <div class="text">
        We have collected the best free online cgirls games. These games include browser games for your computer and mobile devices, as well as apps for Android and iOS phones and tablets. These include new girl games such as Happy Crayons, Princess Nail Art, Puppy Blast, Mahjong Sweet Easter, Tiktok Princess, Fun Summer Holiday and other games.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomIndex",
  props: ["titleType"],
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.titleType);
  }
}
</script>

<style lang="less" scoped>
  .bottom-box{
    padding: 20px 30px;
    margin-bottom: 20px;
    .bj{
      padding: 40px 0 30px;
      background-color: rgb(0 71 217);
      border-radius: 20px;
      box-shadow: 0 3px 8px 0 rgb(16 0 76 / 60%);
      .title{
        font-size: 27px;
        color: #fff;
        text-align: center;
        margin-bottom: 4px;
      }
      .small-title{
        margin-left: 32px;
        font-size: 20px;
        color: #fff;
        line-height: 1;
        font-weight: 700;
        margin-top: 28px;
      }
      .text{
        padding: 0 50px;
        margin-top: 16px;
        font-size: 16px;
        color: #dde5ff;
        word-break: break-word;
        white-space: normal;
        word-wrap: break-word;
      }
      .bd-link{
        color: #fff81a;
        font-size: 16px;
        padding-left: 18px;
        display: inline-block;
      }
      .bd-link:nth-of-type(1){
        padding-top: 12px;
      }
    }
  }
</style>
