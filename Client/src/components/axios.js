import axios from "axios";
const api = axios.create({
    baseURL: "https://buckito-backend.herokuapp.com/",
    mode: "no-cors",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "same-origin",
});

export default api;
