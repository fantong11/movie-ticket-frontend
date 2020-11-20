import {
    apiUserLogin,
    apiUserSignUp,
    apiUsernameCheck,
    apiUserAuthenticate,
} from '../../api/api';

const data = {
    name: localStorage.getItem('user') || '',
    token: localStorage.getItem('token') || '',
    status: false,
    wait: false, // to perform overlay while running api call promise
    responseMsg: '',
};

const mutations = {
    login(state, payload) {
        state.name = payload.name;
        state.status = true;
        state.token = payload.token;
    },
    logout(state) {
        state.name = "";
        state.status = false;
        state.token = "";
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
                commit("setResponseMsg", { responseMsg: response.data.responseMsg });
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
                commit("setResponseMsg", { responseMsg: response.data.responseMsg });
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
                // 使用者名稱和token存在localStorage
                const username = payload.username;
                const token = response.data.accessToken;
                localStorage.setItem('user', username);
                localStorage.setItem('token', token)
                commit("login", {
                    name: username,
                    status: true,
                    token: token
                });
                resolve(response);
            }).catch(error => {
                console.log(error);
                localStorage.removeItem('user');
                localStorage.removeItem('status');
                reject(new Error("error"));
            });
        });
    },
    userAuth({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            console.log(payload);
            apiUserAuthenticate({
                token: payload.token,
            })
            // token驗證成功
            .then((response) => {
                //console.log(response);
                commit("login", {
                    name: localStorage.getItem("user"),
                    status: true,
                    token: localStorage.getItem("token")
                });
                resolve(response);
            })
            // token驗證錯誤就登出
            .catch((error) => {
                //console.log(error);
                dispatch("logout");
                reject(error);
            });
        });
    },
    // 登出後移除localStorage
    logout({ commit }) {
        return new Promise((resolve) => {
            commit("logout");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
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