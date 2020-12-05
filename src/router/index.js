import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NowPlayingMovie from '../views/NowPlayingMovie.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Movie from '../views/Movie.vue'
import ComingMovie from '../views/ComingMovie.vue'
import AddMovie from '../views/AddMovie.vue'
import AddShowing from '../views/AddShowing.vue'

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
    },
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
  {
    path: '/nowplayingmovie/:movieId/:movieName',
    name: 'Movie',
    component: Movie,
    meta: {
      breadcrumb: [{
        name: "首頁",
        link: "/"
      },
      {
        name: "熱映中",
        link: "/nowplayingmovie"
      },
      {
        name: "",
      }]
    },
  },
  {
    path: '/comingmovie',
    name: 'ComingMovie',
    component: ComingMovie,
    meta: {
      breadcrumb: [{
        name: "首頁",
        link: "/"
      },
      {
        name: "即將上映",
        link: "/comingmovie"
      }]
    }
  },
  {
    path: '/admin/addmovie',
    name: 'AddMovie',
    component: AddMovie,
  },
  {
    path: '/admin/addshowing',
    name: 'AddShowing',
    component: AddShowing,
  }
]

const router = new VueRouter({
  routes
});

export default router
