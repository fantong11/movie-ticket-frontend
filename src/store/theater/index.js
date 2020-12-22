import {
  apiFetchAllTheater,
  apiFetchTheaterByMovieId,
} from '../../api/api';

const data = {
  wait: false,
  theater: {},
  theaterList: {
    selected: null,
    options: [{ value: null, text: "請選擇影城" }]
  },
  theaterListFindByMovieId: [],
}

const mutations = { //state
  setTheaterList(state, payload) {
    payload.theaterList.forEach((theater) => {
      console.log(theater)
      state.theaterList.options.push({ value: theater.id, text: theater.name });
    })
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