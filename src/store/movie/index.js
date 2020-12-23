import {
  apiFetchMovieByRelease,
  apiFetchOneMovie,
  apiAddMovie,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  movie: { pic_path: "not_found.jpg" }, // 預設給存在的圖片，不然會報錯
  movieList: [], // 存下呼叫api拿到的電影資料
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
  },
  setMovieName(state, payload) {
    state.movieName = payload.movieName;
    console.log(state.movieName);
  }
}

const actions = {
  // 向後端請求電影清單，有分正在上映、即將上映和全部電影
  fetchMovieByRelease({ commit }, payload) {
    commit("setWait", { flag: true });
    return new Promise((resolve, reject) => {
      apiFetchMovieByRelease(payload.release).then(response => {
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
  // 用id來拿查詢電影
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
  // 增加電影資料
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