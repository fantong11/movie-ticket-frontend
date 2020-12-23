import {
  apiFetchAllTheater,
  apiFetchTheaterByMovieId,
} from '../../api/api';

const data = {
  wait: false,
  theaterList: [],
  theaterListFindByMovieId: [],
}

const mutations = { //state
  setTheaterList(state, payload) {
    state.theaterList = payload.theaterList;
  },
  theaterListFindByMovieId(state, payload) {
    state.theaterListFindByMovieId = payload.theaterList;
  }
}

const actions = {
  // 拿到全部的電影院
  fetchAllTheater({ commit }) {
    return new Promise((resolve, reject) => {
      apiFetchAllTheater().then(response => {
        console.log(response.data)
        commit("setTheaterList", { theaterList: response.data })
        resolve()
      }).catch(error => {
        console.log(error)
        reject()
      });
    });
  },
  // 用id查詢電影院
  fetchTheaterByMovieId({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiFetchTheaterByMovieId(payload.movieId).then(res => {
        console.log(res.data);
        commit("theaterListFindByMovieId", { theaterList: res.data });
        resolve()
      }).catch(err => {
        console.log(err);
        reject();
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