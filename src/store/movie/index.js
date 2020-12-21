import {
  apiFetchAllMovie,
  apiFetchOneMovie
} from '../../api/api';

const data = {
  wait: false,
  movie: { pic_path: "not_found.jpg" },
  movieList: [],
}

const mutations = {
  setWait(state, payload) {
    state.wait = payload.flag;
  },
  setMovie(state, payload) {
    state.movie = payload.movie;
  },
  setMovieList(state, payload) {
    state.movieList = payload.movieList;
  }
}

const actions = {
  // 向後端請求全部的電影清單
  fetchAllMovie({ commit }, payload) {
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
      apiFetchAllMovie(payload.release).then(response => {
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
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
      apiFetchOneMovie(payload.movieId).then(response => {
        console.log(response.data);
        commit("setMovie", { movie: response.data });
        commit("setWait", { flag: false });
        resolve();
      }).catch(error => {
        console.log(error);
        commit("setWait", { flag: false });
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