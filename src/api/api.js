import axios from 'axios';

// user相關api
const userRequest = axios.create({
    baseURL: '/api/user/'
});

// 收尋相關api
const searchRequest = axios.create({
    baseURL: '/api/search/'
});

// 電影相關api
const movieRequest = axios.create({
    baseURL: '/api/movie/'
});

const theaterRequest = axios.create({
    baseURL: '/api/theater/'
});

const showingRequest = axios.create({
    baseURL: '/api/showing'
});

const seatRequest = axios.create({
    baseURL: '/api/seat'
});

const orderRequest = axios.create({
    baseURL: '/api/order'
});

// user相關api
export const apiUserLogin = data => userRequest.post("/signIn", data);
export const apiUserSignUp = data => userRequest.post("/signUp", data);
export const apiUsernameCheck = data => userRequest.post("/usernameCheck", data);
export const apiUserAuthenticate = data => userRequest.post("/authenticate", data);
export const apiAdminBoard = data => userRequest.post("/adminBoard", data);

// 收尋相關api
export const apiSearch = data => searchRequest.get(`/Search?searchdata=${data}`);

// 電影相關api
export const apiFetchMovieByRelease = data => movieRequest.get(`/movieList?release=${data}`);
export const apiFetchOneMovie = data => movieRequest.get(`/movie?movieid=${data}`);
export const apiAddMovie = data => movieRequest.post("/addMovie", data);

// 影城相關api
export const apiFetchAllTheater = () => theaterRequest.get('/theaterList');
export const apiFetchTheaterByMovieId = data => theaterRequest.get(`/theater?movieid=${data}`);

// 場次相關api
export const apiFetchShowing = data => showingRequest.get(`/movietime?movieid=${data.movieId}&theaterid=${data.theaterId}`);
export const apiFetchDetailByShowingId = data => showingRequest.get(`/showingDetail?showingid=${data}`);
export const apiAddShowing = data => showingRequest.post("/addShowing", data);

// 座位相關api
export const apiFetchSeatByShowingId = data => seatRequest.post("/fetchSeatByShowingId", data);
export const apiAddSeat = data => seatRequest.post("/addSeat", data);

// 訂單相關api
export const apiAddOrdeer = data => orderRequest.post("/addOrder", data);
