import {
    apiUserLogin,
    apiUserSignUp,
    apiUsernameCheck,
} from '../../api/api';

const data = {
    name: localStorage.getItem('user') || '',
    status: localStorage.getItem('status') || '',
    wait: false, // to perform overlay while running api call promise
    responseMsg: '',
};

const mutations = {
    login(state, payload) {
        state.name = payload.name;
        state.status = payload.status;
    },
    logout(state) {
        state.name = "";
        state.status = "";
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
    // 向後端請求比對帳號密碼，成功後加入localStorage
    sendLoginInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            apiUserLogin({
                username: payload.username,
                password: payload.password,
            }).then(response => {
                console.log(response);
                const username = payload.username;
                localStorage.setItem('user', username);
                localStorage.setItem('status', "login");
                commit("login", { name: username, status: "login"});
                resolve(response);
            }).catch(error => {
                console.log(error);
                localStorage.removeItem('user');
                localStorage.removeItem('status');
                reject(new Error("error"));
            });
        });
    },
    // 登出後移除localStorage
    logout({ commit }) {
        return new Promise((resolve) => {
            commit("logout");
            localStorage.removeItem('user');
            localStorage.removeItem('status');
            resolve();
        });
    }
};

export default {
    state: data,
    mutations,
    actions,
    namespaced: true,
};