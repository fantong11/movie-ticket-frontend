import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      breadcrumb: [{
        name: "首頁"
      }]
    }
  },
  {
    path: '/nowplayingmovie',
    name: 'NowPlayingMovie',
    component: () => import('@/views/NowPlayingMovie'),
    meta: {
      // release: "now",
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
    component: () => import('@/views/Login'),
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
    component: () => import('@/views/Registration'),
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
    component: () => import('@/views/Movie'),
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
    component: () => import('@/views/ComingMovie'),
    meta: {
      // release: "coming",
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
    meta: { requireAuth: "admin" },
    component: () => import('@/views/AddMovie'),
  },
  {
    path: '/admin/addshowing',
    name: 'AddShowing',
    meta: { requireAuth: "admin" },
    component: () => import('@/views/AddShowing'),
  },
  {
    path: '/selecttime',
    name: 'SelectTime',
    meta: { requireAuth: "member" },
    component: () => import('@/views/SelectTime') ,
  },
  {
    path: '/nowplayingmovie/selectticket',
    name: 'SelectTicket',
    meta: { requireAuth: "member" },
    component: () => import('@/views/SelectTicket')
  },
  {
    path: '/admin/DeleteMovie',
    name: 'DeleteMovie',
    meta: { requireAuth: "admin" },
    component: () => import('@/views/DeleteMovie'),
  },
  {
    path: '/admin/DeleteShowing',
    name: 'DeleteShowing',
    component: () => import('@/views/DeleteShowing'),
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('@/views/Member'),
  },
  {
    path: '/nowplayingmovie/selectseat',
    name: 'SelectSeat',
    meta: { requireAuth: "member" },
    component: () => import('@/views/SelectSeat'),
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    meta: { requireAuth: "member" },
    component: () => import('@/views/CheckOut'),
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (to.meta.requireAuth === localStorage.getItem("role")) {
      next();
    }
    else {
      next({ name: "Login" });
    }
  }
  else {
    next();
  }
});

export default router
