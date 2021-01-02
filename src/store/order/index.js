import {
  apiFetchUserOrder,
  apiSendOrder,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  orderList: [],
}

const mutations = {
  setOrderList(state, payload) {
    state.orderList = payload.orderList;
  }
}

const actions = {
  fetchUserOrder({ commit }) {
    return new Promise((resolve, reject) => {
      apiFetchUserOrder({
        token: localStorage.getItem("token"),
      }).then(res => {
        console.log(res.data);
        commit("setOrderList", { orderList: res.data });
        resolve();
      }).catch((err) => {
        console.log(err);
        reject();
      });
    });
  },
  sendOrder() {
    return new Promise((resolve, reject) => {
      apiSendOrder({
        token: localStorage.getItem("token"),
        showingId: sessionStorage.getItem("showingId"),
        order: sessionStorage.getItem("order"),
        seat: sessionStorage.getItem("seat"),
      }).then((res) => {
        console.log(res.data);
        resolve();
      }).catch((err) => {
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