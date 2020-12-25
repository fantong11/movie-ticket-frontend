import {
  apiAddShowing,
  apiFetchShowing,
  apiGetShowingDetail,
  apiDeleteShowing,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  movieDateTimes: [], // 裡面存日期裡的場次
  movieName: "",
  theaterName: "",
  showingList: [],
}

const mutations = {
  // 重置
  resetMovieDateTimes(state) {
    state.movieDateTimes = [];
  },
  setMovieName(state, payload) {
    state.movieName = payload.movieName;
  },
  setTheaterName(state, payload) {
    state.theaterName = payload.theaterName;
  },
  setShowing(state, payload) {
    state.showingList = payload.showingList;
    state.showingList.forEach(data => {
      let date = new Date(data.show_time);
      date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" +
        date.getDate() + " " + date.getHours() + " : " + date.getMinutes();
      data.show_time = date;
    })
    console.log(state.showingList);
  },
  // 拿到的陣列轉成需要的格式
  setMovieDateTimes(state, payload) {
    payload.showings.forEach(showing => {
      let dateExist = false;
      const date = new Date(showing.show_time);
      let dateStr = date.getFullYear() + " 年 " + date.getMonth() + " 月 " + date.getDate() + " 日";
      // 日期存在的話裡面坐迴圈去判斷日期一不一樣，加入對應的時間
      state.movieDateTimes.forEach(movieDate => {
        if (movieDate.date === dateStr) {
          movieDate.showings.push({
            id: showing.id,
            time: date.getHours() + " : " + date.getMinutes()
          });
          dateExist = true;
        }
      });
      // 沒有存在的日期的話把新的日期加進去
      if (!dateExist) {
        state.movieDateTimes.push({
          date: dateStr,
          showings: [{ id: showing.id, time: date.getHours() + " : " + date.getMinutes() }],
        });
      }
    });
  }
}

const actions = {
  fetchShowing({ commit }, payload) {
    commit("resetMovieDateTimes");
    return new Promise((resolve, reject) => {
      apiFetchShowing({
        movieId: payload.movieId,
        theaterId: payload.theaterId,
      }).then(res => {
        commit("setMovieDateTimes", { showings: res.data });
        commit("setTheaterName", { theaterName: res.data[0].theaterName });
        commit("setMovieName", { movieName: res.data[0].movieName });
        resolve();
      }).catch(err => {
        console.log(err);
        reject();
      });
    });
  },
  addShowing({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiAddShowing({
        token: payload.token,
        showingDatetime: payload.showingDatetime,
        showingAudio: payload.showingAudio,
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
  },
  GetShowingDetail({ commit }) {
    return new Promise((resolve, reject) => {
      apiGetShowingDetail().then(res => {
        console.log(res.data);
        commit("setShowing", { showingList: res.data });
        resolve();
      }).catch(error => {
        console.log(error);
        reject();
      })
    })
  },
  deleteShowings({ commit }, payload){
    return new Promise((resolve, reject) => {
      apiDeleteShowing({
        token: payload.token,
        deleteId: payload.deleteId,
      }).then(res => {
        console.log(res.data+"test OK");
        commit("setWait", { flag: false });
        resolve();
      }).catch(error => {
        console.log(error+"fail");
        commit("setWait", { flag: false });
        reject();
      })
    })
  },
}

export default {
  state: data,
  mutations,
  actions,
  namespaced: true,
}