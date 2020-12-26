import {
  apiFetchSeatByShowingId,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  soldSeatList: [],
}

const mutations = {
  setSoldSeatList(state, payload) {
    payload.soldSeatList.forEach(soldSeat => {
      state.soldSeatList.push(soldSeat.seat_row_column);
    });
    // state.soldSeatList = payload.soldSeatList;
  },
}

const actions = {
  fetchSeatByShowingId({ commit }) {
    return new Promise((resolve, reject) => {
      apiFetchSeatByShowingId({
        showingId: sessionStorage.getItem("showingId"),
      }).then(res => {
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