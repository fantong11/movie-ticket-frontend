import {
    apiFetchShowing
} from '../../api/api';

const data = {
    wait: false,
    showing: [],
}

const mutations = {
    setShowing({ state }, payload) {
        state.showing = payload.showing;
    }
}

const actions = {
    fetchShowing({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiFetchShowing({
                movieId: payload.movieId,
                theaterId: payload.theaterId,
            }).then(res => {
                commit("setShowing", { showing: res.data.showing });
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