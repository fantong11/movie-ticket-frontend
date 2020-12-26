import {
  apiFetchSeatByShowingId,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  soldSeatList: [],
}

const mutations = {
  setSoldSeatList(state, payload) {
    state.soldSeatList = payload.soldSeatList;
  },
}

const actions = {
  fetchSeatByShowingId({ commit }) {
    return new Promise((resolve, reject) => {
      apiFetchSeatByShowingId({
        showingId: sessionStorage.getItem("showingId"),
      }).then(res => {
        console.log(res.data);
        commit("setSoldSeatList", { soldSeatList: res.data });
        resolve();
      }).catch((err) => {
        console.log(err);
        reject();
      });
    });
  }
}

export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}