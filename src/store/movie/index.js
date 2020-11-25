import {
    apiFetchMovie,
} from '../../api/api';

const data = {
    wait: false,
    movieList: [],
}

const mutations = {
    setWait(state, payload) {
        state.wait = payload.flag;
    },
    setMovieList(state, payload) {
        state.movieList = payload.movieList;
    }
}

const actions = {
    // 向後端請求全部的電影清單
    fetchMovie({ commit }) {
        return new Promise((resolve, reject) => {
            commit("setWait", { flag: true });
            apiFetchMovie().then(response => {
                console.log(response.data);
                commit("setMovieList", { movieList: response.data });
                commit("setWait", { flag: false });
                resolve();
            }).catch(error => {
                console.log(error);
                commit("setWait", { flag: false });
                reject(new Error("error"));
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