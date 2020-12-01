import {
  apiFetchAllMovie,
  apiFetchOneMovie
} from '../../api/api';

const data = {
  wait: false,
  movie: {},
  movieList: [],
}

const mutations = {
  setWait(state, payload) {
    state.wait = payload.flag;
  },
  setMovie(state, payload) {
    state.movie = payload.movie;
    console.log(state.movie);
  },
  setMovieList(state, payload) {
    state.movieList = payload.movieList;
  }
}

const actions = {
  // 向後端請求全部的電影清單
  fetchAllMovie({ commit }) {
    return new Promise((resolve, reject) => {
      commit("setWait", { flag: true });
      apiFetchAllMovie().then(response => {
        console.log(response.data);
        commit("setMovieList", { movieList: response.data });
        commit("setWait", { flag: false });
        resolve();
      }).catch(error => {
        console.log(error);
        commit("setWait", { flag: false });
        reject(new Error("error"));
      });
    });
  },
  fetchOneMovie({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiFetchOneMovie(payload.movieId).then(response => {
        console.log(response.data);
        commit("setMovie", { movie: response.data });
        resolve();
      }).catch(error => {
        console.log(error);
        reject(new Error("error"));
      });
    });
  },
}


export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}