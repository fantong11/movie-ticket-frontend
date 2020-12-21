import {
  apiAddShowing,
  apiFetchShowing
} from '../../api/api';

const data = {
  wait: false,
  showing: [],
}

const mutations = {
  setShowing({ state }, payload) {
    state.showing = payload.showing;
  }
}

const actions = {
  fetchShowing({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiFetchShowing({
        movieId: payload.movieId,
        theaterId: payload.theaterId,
      }).then(res => {
        commit("setShowing", { showing: res.data.showing });
        resolve();
      }).catch(err => {
        console.log(err);
        reject();
      });
    });
  },

  addShowing({commit}, payload) {
    return new Promise((resolve, reject) => {
      apiAddShowing({
        token: payload.token,
        movie: payload.movie,
        theater: payload.theater,
        showing_date: payload.showing_date,
        showing_time: payload.showing_time,
      }).then(res => {
        console.log(res.data);
        commit("setWait", { flag: false });
        resolve();
      }).catch(error => {
        console.log(error);
        commit("setWait", { flag: false });
        reject(new Error("error"));
      })
    })
  }
}

export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}