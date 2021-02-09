import axios from "axios";

// for quick switch
const choice = {
    1: "https://buckito-backend.herokuapp.com",
    2: "http://localhost:4000",
};

//If token exists add to header
let token = "";
if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
}
//axios default
const api = axios.create({
    baseURL: choice[1],
    headers: {
        token: token,
    },
});

export default api;
