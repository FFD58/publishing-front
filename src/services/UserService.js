import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/auth/";

export const signUp = (user) => axios.post(REST_API_BASE_URL + "sign-up", user);

export const signIn = (user) => axios.post(REST_API_BASE_URL + "sign-in", user);






