import axios from 'axios';

// user相關api
const userRequest = axios.create({
    baseURL: '/api/user/'
});

// 收尋相關api
const searchRequest = axios.create({
    baseURL: '/api/search/'
});

// 電影相關...



// user相關api
export const apiUserLogin = data => userRequest.post("/signIn", data);
export const apiUserLogout = data => userRequest.post("/signOut", data);
export const apiUserSignUp = data => userRequest.post("/signUp", data);
export const apiUsernameCheck = data => userRequest.post("/usernameCheck", data);

// 收尋相關api
export const apiSearch = data => searchRequest.get(`/Search?searchdata=${data}`);