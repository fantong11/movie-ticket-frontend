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
    apiFetchSeatByShowingId({
      showingId: sessionStorage.getItem("showingId"),
    }).then(res => {
      console.log(res.data);
      commit("setSoldSeatList", { soldSeatList: res.data });
    });
  }
}

export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}