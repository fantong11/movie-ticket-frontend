import {
  apiFetchUserOrderSeat,
  apiFetchUserOrderDrink,
  apiSendOrder,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  orderList: [],
  message: "",
}

const mutations = {
  resetOrderList(state) {
    state.orderList = [];
  },
  setWait(state, payload) {
    state.wait = payload.flag;
  },
  setOrderList(state, payload) {
    let currentOLID = -1
    let index = 1;
    payload.orderSeatList.forEach((orderSeat) => {
      if (orderSeat.OLID !== currentOLID) {
        let orderDate = new Date(orderSeat.OTime);
        let ShowDate = new Date(orderSeat.Stime);
        let orderDateTime = orderDate.getFullYear() + "/" + (orderDate.getMonth() + 1) + "/" + orderDate.getDate() + " " + orderDate.getHours() + ":" + orderDate.getMinutes();
        let ShowDateTime = ShowDate.getFullYear() + "/" + (ShowDate.getMonth() + 1) + "/" + ShowDate.getDate() + " " + ShowDate.getHours() + ":" + ShowDate.getMinutes();

        state.orderList.push({
          orderTime: orderDateTime,
          orderContent: {
            uid: orderSeat.uid,
            theater: orderSeat.Tname,
            seat: [orderSeat.seat_row_column],
            drink: [],
            audio: orderSeat.audio,
            movie: orderSeat.Mname,
            showingTime: ShowDateTime,
            totalCost: orderSeat.OLP,
          },
          detailId: String(index),
        });
        payload.orderDrinkList.forEach((orderDrink) => {
          if (orderDrink.OLID === orderSeat.OLID)
            state.orderList[state.orderList.length - 1].orderContent.drink.push({ drinkName: orderDrink.PName, amount: orderDrink.amount });
        });
        currentOLID = orderSeat.OLID;
        index++;
      }
      else {
        state.orderList[state.orderList.length - 1].orderContent.seat.push(orderSeat.seat_row_column);
      }

    });
  },
  setResponseMessage(state, payload) {
    state.message = payload.message;
  },
}

const actions = {
  fetchUserOrderSeat({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("resetOrderList");
      apiFetchUserOrderSeat({
        token: localStorage.getItem("token"),
      }).then(res => {
        console.log(res.data);
        dispatch("fetchUserOrderDrink").then((orderDrinkList) => {
          console.log(orderDrinkList);
          commit("setOrderList", {
            orderSeatList: res.data,
            orderDrinkList: orderDrinkList,
          });
          resolve();
        });
      }).catch((err) => {
        console.log(err);
        reject();
      });
    });
  },
  fetchUserOrderDrink({ commit }) {
    return new Promise((resolve, reject) => {
      apiFetchUserOrderDrink({
        token: localStorage.getItem("token"),
      }).then(res => {
        commit("setWait", { flag: false });
        resolve(res.data);
      }).catch((err) => {
        console.log(err);
        reject();
      });
    });
  },
  sendOrder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiSendOrder({
        token: localStorage.getItem("token"),
        showingId: sessionStorage.getItem("showingId"),
        order: sessionStorage.getItem("order"),
        seat: sessionStorage.getItem("seat"),
        coupon: payload.coupon,
      }).then((res) => {
        commit("setResponseMessage", { message: res.data.message });
        console.log(res.data.message);
        commit("setWait", { flag: false });
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