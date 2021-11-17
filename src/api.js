import axios from "axios";

axios.defaults.withCredentials = true;

//User 相關的 api 設定
const userRequest = axios.create({
    //https://jsonplaceholder.typicode.com
    baseURL:'http://140.115.126.95',
    headers:{"Content-Type":"application/json"},
});

// Content 相關的 api
const contentRequest = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    headers:{"Content-Type":"applicaction/json"},
});


//axios interceptors 
userRequest.interceptors.request.use(
    function(config){ 
        config.data = JSON.stringify(config.data);
        // console.log(config);
        return config;
    },
    function(err){
        return Promise.reject(err);
    });

userRequest.interceptors.response.use(
    function(response){
        return response;
    },
    function(err){
        return Promise.reject(err);        
    });

//export 
export const apiUserLogin = userdata =>  userRequest.post('/users/login',userdata);
export const apiContentItem = () => contentRequest.get('albums/1/photos');