import Vue from 'vue'
import Vuex from 'vuex'

import user from './user/index';
import movie from './movie/index'
import theater from './theater/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    movie,
    theater,
  },
})
