import axios from "axios";

const api = axios.create({
    baseURL: "https://airbnb-clone-api-2koc.onrender.com",
    withCredentials: true
})

export default api;