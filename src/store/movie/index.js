import {
  apiFetchMovieByRelease,
  apiFetchOneMovie,
  apiFetchAllMovie,
  apiAddMovie
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
    console.log(state.movie);
  },
  setMovieList(state, payload) {
    state.movieList = payload.movieList;
  }
}

const actions = {
  // 向後端請求全部的電影清單
  fetchMovieByRelease({ commit }, payload) {
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
      apiFetchMovieByRelease(payload.release).then(response => {
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
  fetchAllMovie({ commit }) {
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
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
  addMovie({ commit }, payload) {
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
      apiAddMovie({
        token: payload.token,
        name: payload.name,
        name_en: payload.name_en,
        pic_path: payload.pic_path,
        description: payload.description,
        running_time: payload.running_time,
        director: payload.director,
        actors: payload.actors,
        movie_type: payload.movie_type,
        classification: payload.classification,
        release_date: payload.release_date,
      }).then(res => {
        console.log(res.data);
        commit("setWait", { flag: false });
        resolve();
      }).catch(error => {
        console.log(error);
        commit("setWait", { flag: false });
        reject(new Error("error"));
      })
    });
  }
}

export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}