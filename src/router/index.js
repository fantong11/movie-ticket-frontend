import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NowPlayingMovie from '../views/NowPlayingMovie.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: [{
        name: "首頁"
      }]
    }
  },
  {
    path: '/nowplayingmovie',
    name: 'NowPlayingMovie',
    component: NowPlayingMovie,
    meta: {
      breadcrumb: [{
        name: "首頁",
        link: "/"
      },
      {
        name: "熱映中"
      }]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      breadcrumb: [{
        name: "首頁",
        link: "/"
      },
      {
        name: "登入"
      }]
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {
      breadcrumb: [{
        name: "首頁",
        link: "/"
      },
      {
        name: "註冊"
      }]
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
