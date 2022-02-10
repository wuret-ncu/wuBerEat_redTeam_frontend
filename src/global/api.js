import axios from "axios";

//跨域請求時能正常發出附帶cookie的header
axios.defaults.withCredentials = true; 

//users     
const userRequest = axios.create({
    baseURL:'http://localhost:80/users',
    headers:{"Content-Type":"application/json"},
});

//dashboard
const dashboardRequest = axios.create({ 
  baseURL:"http://localhost:80/dashboard",
  headers:{"Content-Type":"application/json"},
});

//User interceptors 
dashboardRequest.interceptors.request.use(
  config => { 
      console.log(config);
      return config;
  },
  error => {
      console.log(error);
      return Promise.reject(error);
  });

dashboardRequest.interceptors.response.use(
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
            console.log(error.response)
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
export const apiUserRegister = (data) => userRequest.post('/signup',data);
//使用者資料 相關的 api
export const apiUserDetailsRequest = (config) => userRequest.get('/me',config);
//refreshToken 驗證 相關的 api
export const apiUserRefreshToken = () =>userRequest.post('/refreshToken');


//餐廳內容 相關的 api
export const apiContentItem = () => dashboardRequest.get('/restaurants');
//編輯 刪除 餐廳資訊
export const apiContentItemDelete = (id) => dashboardRequest.delete('/',id)
//餐廳資訊上傳 相關的 api
export const apiUpLoadmenu = (data) => dashboardRequest.post('/createMenu',data);

//cart 相關的 api (findCart)
export const apiCartRecord = (userid) => dashboardRequest.get(`/carts/${userid}`);
//新增購物車(CreatCart)
export const apiCreatCart = (data) => dashboardRequest.post('/carts',data)

//訂單紀錄 相關的 api
export const apiUserRecord = (userid) => dashboardRequest.get(`/orderRecord/${userid}`)
export const apiOrderDish = (data) => dashboardRequest.post('/orderRecord',data)

//搜尋 相關的 api
export const apiSearch = (config) => dashboardRequest.get('/search',config)
