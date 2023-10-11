import axios from "axios";
import { useAuthStore } from "../store/UserStore";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

// api.interceptors.request.use(
//     (config) => {
//         const token = useAuthStore.getState().token;
//         config.headers = {
//             Authorization: `Bearer ${token}`
//         };

//         return config
//     }
// )

export default api;