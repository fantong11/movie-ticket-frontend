import {
    apiFetchShowing
} from '../../api/api';

const data = {
    wait: false,
    movieDateTimes: [],
    movieName: "",
    theaterName: "",
}

const mutations = {
    resetShowing(state) {
        state.movieDateTimes = [];
    },
    setMovieName(state, payload) {
        state.movieName = payload.movieName;
    },
    setTheaterName(state, payload) {
        state.theaterName = payload.theaterName;
    },
    setShowing(state, payload) {
        payload.showings.forEach(showing => {
            let dateExist = false;
            const date = new Date(showing.show_time);
            let dateStr = date.getFullYear() + " 年 " + date.getMonth() + " 月 " + date.getDate() + " 日";
            console.log(dateStr);
            state.movieDateTimes.forEach(movieDate => {
                if (movieDate.date === dateStr) {
                    movieDate.showings.push({ 
                        id: showing.id, 
                        time: date.getHours() + " : " + date.getMinutes() 
                    });
                    dateExist = true;
                }
            });
            if (!dateExist) {
                state.movieDateTimes.push({ 
                    date: dateStr, 
                    showings: [{ id: showing.id, time: date.getHours() + " : " + date.getMinutes() }],
                });
            }
        });
        console.log(state.movieDateTimes)
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
                console.log(res.data);
                commit("setShowing", { showings: res.data });
                commit("setTheaterName", { theaterName: res.data[0].theaterName});
                commit("setMovieName", { movieName: res.data[0].movieName});
                resolve();
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