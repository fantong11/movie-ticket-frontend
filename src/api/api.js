import axios from 'axios';

// user相關api
const userRequest = axios.create({ baseURL: '/api/user' });

// 電影相關api
const movieRequest = axios.create({ baseURL: '/api/movie' });

// 影城相關api
const theaterRequest = axios.create({ baseURL: '/api/theater' });

// 場次相關api
const showingRequest = axios.create({ baseURL: '/api/showing' });

// 座位相關api
const seatRequest = axios.create({ baseURL: '/api/seat' });

// 訂單相關api
const orderRequest = axios.create({ baseURL: '/api/order' });

// user相關api
export const apiUserLogin = data => userRequest.post("/signIn", data);
export const apiUserSignUp = data => userRequest.post("/signUp", data);
export const apiUsernameCheck = data => userRequest.post("/usernameCheck", data);
export const apiUserAuthenticate = data => userRequest.post("/authenticate", data);
export const apiAdminBoard = data => userRequest.post("/adminBoard", data);

// 電影相關api
export const apiFetchMovieByRelease = data => movieRequest.get(`/movieList?release=${data}`);
export const apiFetchOneMovie = data => movieRequest.get(`/movie?movieid=${data}`);
export const apiAddMovie = data => movieRequest.post("/addMovie", data);
export const apiDeleteMovie = data => movieRequest.post(`/deleteMovie`,data);

// 影城相關api
export const apiFetchAllTheater = () => theaterRequest.get('/theaterList');
export const apiFetchTheaterByMovieId = data => theaterRequest.get(`/theater?movieid=${data}`);

// 場次相關api
export const apiFetchShowing = data => showingRequest.get(`/movietime?movieid=${data.movieId}&theaterid=${data.theaterId}`);
export const apiGetShowingDetail = data => showingRequest.get("/showingDetailDelete", data);
export const apiDeleteShowing = data => showingRequest.post("/deleteShowing" ,data);
export const apiFetchDetailByShowingId = data => showingRequest.get(`/showingDetail?showingid=${data}`);
export const apiAddShowing = data => showingRequest.post("/addShowing", data);

// 訂單相關api
export const apiSendOrder = data => orderRequest.post("/addOrder", data);
export const apiFetchUserOrderSeat = data => orderRequest.post("/userOrderSeat", data);
export const apiFetchUserOrderDrink = data => orderRequest.post("/userOrderDrink", data);

// 座位相關api
export const apiFetchSeatByShowingId = data => seatRequest.post("/fetchSeatByShowingId", data);
export const apiAddSeat = data => seatRequest.post("/addSeat", data);
