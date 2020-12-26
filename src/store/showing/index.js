import {
  apiAddShowing,
  apiFetchShowing,
  apiFetchDetailByShowingId,
} from '../../api/api';

const data = {
  wait: false, // 呼叫api過程是否等待
  movieDateTimes: [], // 裡面存日期裡的場次
  movieName: null,
  movieNameEn: null,
  theaterName: null,
  showTime: null,
  theaterAudio: null,
}

const mutations = {
  // 重置
  resetShowing(state) {
    state.movieDateTimes = [];
  },
  setData(state, payload) {
    state.movieName = payload.movieName;
    state.movieNameEn = payload.movieNameEn;
    state.theaterName = payload.theaterName;
    state.showTime = payload.showTime;
    state.theaterAudio = payload.theaterAudio;
  },
  setMovieName(state, payload) {
    state.movieName = payload.movieName;
  },
  setTheaterName(state, payload) {
    state.theaterName = payload.theaterName;
  },
  // 拿到的陣列轉成需要的格式
  setShowing(state, payload) {
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
    commit("resetShowing");
    return new Promise((resolve, reject) => {
      apiFetchShowing({
        movieId: payload.movieId,
        theaterId: payload.theaterId,
      }).then(res => {
        commit("setShowing", { showings: res.data });
        commit("setTheaterName", { theaterName: res.data[0].theaterName });
        commit("setMovieName", { movieName: res.data[0].movieName });
        resolve();
      }).catch(err => {
        console.log(err);
        reject();
      });
    });
  },
  fetchDetailByShowingId({ commit }, payload) {
    apiFetchDetailByShowingId(payload.showingId).then(res => {
      commit("setData", {
        movieName: res.data[0].movieName,
        movieNameEn: res.data[0].movieNameEn,
        theaterName: res.data[0].theaterName,
        showTime: res.data[0].showTime,
        theaterAudio: res.data[0].theaterAudio,
      });
    }).catch(err => {
      console.log(err);
    });
  },
  addShowing({ commit }, payload) {
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