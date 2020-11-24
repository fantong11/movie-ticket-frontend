import {
    apiFetchMovie,
} from '../../api/api';

const state = {
    movieList: [],
}

const mutations = {
    setMovieList(state, payload) {
        state.movieList = payload.movieList;
    }
}

const actions = {
    // 向後端請求全部的電影清單
    fetchMovie({ commit }) {
        return new Promise((resolve, reject) => {
            apiFetchMovie().then(response => {
                console.log(response);
                commit("setMovieList", response.movieList);
                resolve();
            }).catch(error => {
                console.log(error);
                reject(new Error("error"));
            });
        });
    }
}


export default {
    state,
    mutations,
    actions,
    namespaced: true,
}