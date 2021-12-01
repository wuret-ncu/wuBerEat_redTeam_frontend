import axios from "axios";

//跨域請求時能正常發出附帶cookie的header
// axios.defaults.withCredentials = true; 

//User 相關的 api       
const userRequest = axios.create({
    baseURL:'http://localhost:80/users',
    headers:{"Content-Type":"application/json"},
});

// Content 相關的 api
const contentRequest = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    headers:{"Content-Type":"application/json"},
});

//餐廳資訊上傳 相關的 api
const upLoadmenu = axios.create({
    //http://140.115.126.95/menu
    baseURL:"https://v2.convertapi.com",
    //headers:{'Content-Type':'multipart/form-data'}
});

//Cart相關的 api
const cartRequest = axios.create({ 
  baseURL:"https://jsonplaceholder.typicode.com",
  headers:{"Content-Type":"application/json"},
});
//axios interceptors 
userRequest.interceptors.request.use(
  config => { 
      console.log(config);
      return config;
  },
  error => {
      console.log(error);
      return Promise.reject(error);
  });

userRequest.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response){
          switch (error.response.status) {
            case 404:
              console.log("你要找的頁面不存在")
              // go to 404 page
              break
            case 500:
              console.log("程式發生問題")
              // go to 500 page
              break
            default:
              console.log(error.response.data)
          }
        } 
        if (!window.navigator.onLine) {
          alert("網路出了點問題，請重新連線後重整網頁");
          return;
        }
      return Promise.reject(error);        
  });

//User登入註冊 相關的 api   
export const apiUserLogin = (data) => userRequest.post('/login2',data);
export const apiUserLogout = (config) => userRequest.get('/logout2',config);
export const apiUserRegister = (data,config) => userRequest.post('/signup',data,config);
export const apiUserRefreshToken = (config) =>userRequest.get('/refreshToken',config);
export const apiUserDetailsRequest = (config) => userRequest.get('/me',config);

// Content 相關的 api
export const apiContentItem = () => contentRequest.get('albums/1/photos');

//餐廳資訊上傳 相關的 api
export const apiUpLoadmenu = ({data}) => upLoadmenu.post('/upload',{data});

//cart 相關的 api
export const apiCartList = () => cartRequest.get('/albums/1/photos');

