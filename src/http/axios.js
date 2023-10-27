import axios from "axios";

const api = axios.create({
    baseURL: "https://airbnb-clone-api-2koc.onrender.com",
    // baseURL: "http://localhost:5000",
    withCredentials: true
})

export default api;