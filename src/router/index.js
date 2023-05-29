import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App';
import HomeIndex from '@/components/HomeIndex/Index'; // 首页
import GameType from '@/components/GameType/Index';
import Details from '@/components/Details/Index'; // 详情页
import MobileIndex from '@/components/MobileTerminal/MobileIndex'; // 移动端首页
import MobileClassify from '@/components/MobileTerminal/MobileHome/MobileClassify/Index'; // 移动端分类
import MobileDetails from '@/components/MobileTerminal/MobileDetails/Index'; // 移动端详情
import Privacy from '@/views/Privacy';
import ContactUs from '@/views/ContactUs';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: '/P/homeIndex'
  },
  {
    path: '/P/homeIndex',
    name: 'HomeIndex',
    component: HomeIndex,
  },{
    path: '/P/gameType',
    name: 'GameType',
    component: GameType,
  },{
    path: '/P/details',
    name: 'Details',
    component: Details
  },{
    path: '/M/homeIndex',
    name: 'MobileIndex',
    component: MobileIndex
  },{
    path: '/M/gameType',
    name: 'MobileClassify',
    component: MobileClassify
  },{
    path: '/M/details',
    name: 'mobileDetails',
    component: MobileDetails
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: ContactUs
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
