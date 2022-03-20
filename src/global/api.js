import axios from "axios";

//跨域請求時能正常發出附帶cookie的header
axios.defaults.withCredentials = true; 

//users     
const userRequest = axios.create({
    baseURL:'http://140.115.126.95:80/users',
    headers:{"Content-Type":"application/json"},
});

//dashboard
const dashboardRequest = axios.create({ 
  baseURL:"http://140.115.126.95:80/dashboard",
  headers:{"Content-Type":"application/json"},
});

//User interceptors 
userRequest.interceptors.request.use(
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

//User 相關的 api   
//登入
export const apiUserLogin = (data) => userRequest.post('/login2',data);
//登出
export const apiUserLogout = (config) => userRequest.get('/logout2',config);
//註冊
export const apiUserRegister = (data) => userRequest.post('/signup',data);
//使用者詳細資料
export const apiUserDetailsRequest = (config) => userRequest.get('/me',config);
//refreshToken 驗證 
export const apiUserRefreshToken = () =>userRequest.post('/refreshToken');

//餐廳內容 相關的 api
//取得餐廳資料
export const apiContentItem = () => dashboardRequest.get('/restaurants');
//餐廳評分資料
export const apiGetScore = (restaurantID) => dashboardRequest.get(`/score/${restaurantID}`);
//餐廳留言資料
export const apiGetMessage = (restaurantID) => dashboardRequest.get(`/message/${restaurantID}`);
//刪除餐廳資料
export const apiContentItemDelete = (id) => dashboardRequest.delete('/',id)
//編輯餐廳資料
export const apiContentItemEdit = (restaurantID,data) => dashboardRequest.put(`/restaurant/${restaurantID}`,data)
//餐廳資料上傳 
export const apiUpLoadmenu = (data) => dashboardRequest.post('/createMenu',data);

//cart 相關的 api 
//購物車紀錄 (findCart )
export const apiCartRecord = (userID) => dashboardRequest.get(`/carts/${userID}`);
//新增購物車(CreatCart)
export const apiCreatCart = (data) => dashboardRequest.post('/carts',data)

//訂單紀錄 相關的 api
//訂單紀錄
export const apiUserRecord = (userid) => dashboardRequest.get(`/orderRecord/${userid}`)
//送出訂單
export const apiOrderDish = (data) => dashboardRequest.post('/orderRecord',data)
//訂單評分
export const apiCreateScore = (data) => dashboardRequest.post('/score',data)
//訂單餐廳留言
export const apiCreateMessage = (data) => dashboardRequest.post('/message',data)

//搜尋 相關的 api
export const apiSearch = (config) => dashboardRequest.get('/search',config)
