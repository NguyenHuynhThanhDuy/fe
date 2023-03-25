import axios from "axios";

const request1 = axios.create({
    baseURL: 'http://localhost:3004'
})

export default request1