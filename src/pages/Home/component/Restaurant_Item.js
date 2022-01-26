import React from 'react'
import './Restaurant_Item.css'
import EditWindow from '../../../components/EditWindow';
import { useState, useEffect, useContext } from 'react';
import {CartContext} from '../../../global/CartContext'
import { apiContentItemDelete } from '../../../global/api';

export default function Restaurant_Item({cardImgSrc,cardTitle, cardContent,id,setRestaurantId}) {
    const [cartContext,setCartContext] = useContext(CartContext)
    const [modalshow,setmodalshow] = useState(false)
    
    //刪除
    const deleteMenu = () =>{
      // apiContentItemDelete(cardTitle)
      // .then(res=>{
      //   console.log(res);
      // })
      // .catch(err =>{
      //   console.log(err);
      // })
    }

    //編輯
    const EditMenu = () =>{
      setmodalshow(true)
    }

    //加入購物車 => DishList
    const addToCart = () => {
        setRestaurantId(id)
        // setCartContext(oldValues => {
        //   const productIndex = oldValues.findIndex(
        //     val => val.cardTitle === cardTitle
        //   )
        //   let updatedCartItems = []
        //   //如果 item 已經在 Cart 裡面的話
        //   if (productIndex !== -1) {
        //     updatedCartItems = [
        //       //在陣列裡面該 item 前面的物件
        //         ...oldValues.slice(0, productIndex),
        //       //在陣列裡面同樣的那個 item 數量+1
        //         {
        //           cardTitle,
        //           count: oldValues[productIndex].count + 1,
        //         },
        //       //在陣列裡該 item 後面的物件
        //         ...oldValues.slice(productIndex + 1),
        //       ]
        //   } else {
        //     //item 原本沒在 Cart 裡面 ，保留其他舊的物件， 新增 item 進去
        //     updatedCartItems = [...oldValues, { cardTitle, count: 1 }]
        //   }
        //   //把購物車資料放在 localstorage 裡面
        //   try {
        //     window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
        //   } catch (e) {
        //     console.error("Error in storing cart items in local storage")
        //   }
        //   return updatedCartItems
        // })
      }
      
    //AOS
    useEffect(() => {    
        window.AOS.init({
          duration : 1000
        });
    }, []);


    return (
        <div className="col-6 col-md-3 pb-3">
            <div className="card card-custom bg-white border-white border-0" data-aos="fade-down" data-aos-offset="250"> 
                <img src={`http://localhost:80/${cardImgSrc}`} className="card-custom-img" alt="..." />
                <div className="card-custom-edit" onClick={EditMenu}>
                    <i className="far fa-edit"></i>
                </div>
                <div className="card-body" style={{overflowY: "auto"}}>
                    <h5 className="card-title">{cardTitle}</h5>
                    <div className="card-text">
                      <div className='row'>
                          {cardContent.map(item =>{
                            return(
                              <div className="alert alert-primary col-6 px-auto h-auto" role="alert" >
                              {item}
                            </div> 
                            );
                          })}
                      </div> 
                    </div>
                </div>
                <div className="card-footer px-1" style={{background:"inherit",borderColor:"inherit"}}>
                    <button type="button" className="btn btn-outline-primary me-2" onClick={addToCart}>More...</button>
                    <button type="button" className="btn btn-outline-danger" onClick={deleteMenu}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            {modalshow && <EditWindow hide={setmodalshow}/>}
            
        </div>
           
    )
}
