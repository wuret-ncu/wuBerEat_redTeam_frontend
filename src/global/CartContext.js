import React from "react";
import { useState } from "react";
const CartContext = React.createContext([{}, ()=>{}]);

let initialState = []

try {
    //讓 Context 取得 localstorage 裡儲存的購物車資訊
    //如果沒東西，初始值會變回空陣列
    const item = window.localStorage.getItem("cartItems")
    initialState = item ? JSON.parse(item) : []
  } catch (error) {

  }

const CartProvider = props => {
    const [state, setState] = useState(initialState)
    
    return(
        <CartContext.Provider value = {[state, setState]}>
            {props.children}
        </CartContext.Provider>
    ) 
}
export  {CartContext, CartProvider};