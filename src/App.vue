<template>
  <div id="app">
    <div v-if="determinePcOrMove == 2">
      <Navigation></Navigation>
      <router-view></router-view>
      <BottomNav></BottomNav>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import BottomNav from './components/BottomNav';
import { determinePcOrMove } from '@/utils/utils.js'
export default {
  name: 'App',
  components: {
    Navigation,BottomNav
  },
  data() {
    return {
      determinePcOrMove: determinePcOrMove()
    }
  }
}
</script>

<style>

</style>
