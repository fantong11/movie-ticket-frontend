import {
    apiFetchAllTheater
} from '../../api/api';

const data = {
    wait: false,
    theater: {},
    theaterList: {
        selected: null,
        options: [{ value: null, text: "請選擇影城" }]
    },
}

const mutations = { //state
    setTheaterList(state, payload) {
        for(let theater in payload)
        {
            state.theaterList.options.push({value: theater.id, text: theater.name})
        }
    }
}

const actions = {
    fetchAllTheater({ commit }) {
        return new Promise((resolve, reject) => {
            apiFetchAllTheater().then(response => {
                console.log(response.data)
                commit("setTheaterList", { theaterList: response.data })
                resolve()
            }).catch(error => {
                console.log(error)
                reject()
            })
        });
    },
}

export default {
    state: data,
    mutations,
    actions,
    namespaced: true,
}