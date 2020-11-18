import {
    apiUserLogin,
    apiUserSignUp,
    apiUsernameCheck,
} from '../../api/api';

const data = {
    user : {},
    token: localStorage.getItem('user-token') || '',
    status: '',
    wait: false, // to perform overlay while running api call promise
    responseMsg: '',
};

const mutations = {
    auth_request(state){
        state.status = 'loading';
    },
    auth_success(state, token, user){
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    auth_error(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
    },
    setResponseMsg(state, payload) {
        state.responseMsg = payload.responseMsg;
    },
}

const actions = {
    // 送username給後端檢查是否重複
    sendUsernameInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiUsernameCheck({
                username: payload.username,
            }).then(response => {
                console.log(response);
                commit("setResponseMsg", {responseMsg: response.data.responseMsg});
                resolve();
            }).catch(error => {
                console.log(error);
                reject(new Error("error"));
            });
        }); 
    },
    // 送username跟password給後端新增使用者
    sendSignUpInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiUserSignUp({
                username: payload.username,
                password: payload.password,
            }).then(response => {
                console.log(response);
                commit("setResponseMsg", {responseMsg: response.data.responseMsg});
                resolve();
            }).catch(error => {
                console.log(error);
                reject(new Error("error"));
            });
        }); 
    },
    sendLoginInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiUserLogin({
                username: payload.username,
                password: payload.password,
            }).then(response => {
                console.log(response);
                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem('token', token);
                commit('auth_success', token, user);
                resolve(response);
            }).catch(error => {
                console.log(error);
                commit('auth_error')
                localStorage.removeItem('token')
                reject(new Error("error"));
            });
        });
    },
};

export default {
    state: data,
    mutations,
    actions,
    namespaced: true,
};