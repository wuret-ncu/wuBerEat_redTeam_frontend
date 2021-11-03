import axios from "axios";

//User相關的 api
const userRequest = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    headers:{"Content-Type":"application/json"}
});


export const apiUserLogin = data => userRequest.post('/users/1/posts',data);