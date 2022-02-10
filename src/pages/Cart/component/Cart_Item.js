import React, { useEffect } from 'react';
import './Cart_Item.css'
import { useContext } from 'react'; 
import { CartContext } from '../../../global/CartContext';
import { apiCreatCart } from '../../../global/api';

export default function CartItem({cartData}) {
    const[cartContext,setCartContext] = useContext(CartContext)

    const Item = ({orderName, orderCount}) =>{
        const addCart = () =>{
            setCartContext(oldValues => {
              const productIndex = oldValues.findIndex(
                val => val.orderName === orderName
              )
              let updatedCartItems = []
              //如果 item 已經在 Cart 裡面的話
              if (productIndex !== -1) {
                updatedCartItems = [
                  //在陣列裡面該 item 前面的物件
                    ...oldValues.slice(0, productIndex),
                  //在陣列裡面同樣的那個 item 數量+1
                    {
                        orderName,
                        count: oldValues[productIndex].count + 1,
                    },
                  //在陣列裡該 item 後面的物件
                    ...oldValues.slice(productIndex + 1),
                  ]
              }
              //把購物車資料放在 localstorage 裡面
              try {
                window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
                //更新購物車
                apiCreatCart(cartData)
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                })
              } catch (e) {
                console.error("Error in storing cart items in local storage")
              }
              return updatedCartItems
            })
        }

        const subCart = () =>{
            setCartContext(oldValues => {
              const productIndex = oldValues.findIndex(
                val => val.orderName === orderName
              )
              let updatedCartItems = []
              //如果 item 已經在 Cart 裡面的話
              if (productIndex !== -1) {
                updatedCartItems = [
                  //在陣列裡面該 item 前面的物件
                    ...oldValues.slice(0, productIndex),
                  //在陣列裡面同樣的那個 item 數量+1
                    {
                        orderName,
                        count: oldValues[productIndex].count - 1,
                    },
                  //在陣列裡該 item 後面的物件
                    ...oldValues.slice(productIndex + 1),
                  ]
              }

              //把購物車資料放在 localstorage 裡面
              try {
                window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
              } catch (e) {
                console.error("Error in storing cart items in local storage")
              }
              return updatedCartItems
            })

            //更新購物車
            apiCreatCart(cartData)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        }

        
            
        return(
            <div className="row g-0 align-items-center mb-3">
                <div className="col-6 col-md-3">
                    <img src="https://picsum.photos/1200/600?random=10" className="rounded-start cart_item_img" alt="..." />
                </div>
                <div className="col-6 col-md-3 item_name">
                    <h5>{orderName}</h5>
                </div>
                <div className="col-6 col-md-3 mt-2 order_col"> 
                    <button type="button" className="btn btn-secondary order_item_btn mx-2" onClick={addCart}><i className="fas fa-plus"></i></button>
                    <span className='mx-2'>{orderCount}</span>
                    <button type="button" className="btn btn-secondary order_item_btn mx-2" onClick={subCart}><i className="fas fa-minus"></i></button> 
                </div>
                <div className="col-3 col-md-2 cost_item mt-2">
                    <h5>cost</h5>   
                </div>
                <div className="col-3 col-md-1 del_item mt-2">
                    <a  href="/#"><i className="fas fa-trash"></i></a>    
                </div>  
            </div>
        )
    }

    return (
    <div className="container mb-4">
        <div className="row">
            <div className="col-12">
                {
                    Object.entries(cartContext).map(([key,value])=>{
                        const orderName = value.orderName
                        const orderCount = value.count
                        return(
                            <>
                                <Item orderName={orderName} orderCount={orderCount}/>
                            </>
                        )})
                }
            </div>    
        </div>
        
    </div>
    )
}
