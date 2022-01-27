import React from 'react'
import { useState, useEffect, useRef,useContext} from 'react';
import {CartContext} from '../../../global/CartContext'

export default function DishList({dishData}) {
    const [markerPosition, setMarkerPosition] = useState({lat:24.968281,lng:121.192889});
    const {lat,lng} = markerPosition;
    const google = window.google; //Google Geocode Api
    const L = window.L; //Leaflet.js
    const mapRef = useRef(null); 
    const markerRef = useRef(null); 
    const circleRef = useRef(null); 
    const [cartContext,setCartContext] = useContext(CartContext) //cart
    const [orderDish,setOrderDish] = useState()

    const handleFlyTo = () =>{
        mapRef.current.flyTo(markerPosition, 15, {
            duration: 2
        });
    }

    //Create Map
    useEffect(()=>{
        mapRef.current = L.map("map").setView([24.968281, 121.192889], 15);
        const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        const tiles = L.tileLayer(tileUrl, { attribution }); //圖層設定
        tiles.addTo(mapRef.current); //新增圖層
    },[])

    useEffect(()=>{
        var geocoder = new google.maps.Geocoder();
        var address = `${dishData[0].restaurantLocation}`
        //根據店家地址發 request 給 Google Geocoder api 取 Lat & Lng
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK)
        {
            setMarkerPosition({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            });
        }
        });
    },[])

    //Add Marker 
    useEffect(()=>{
        if (markerRef.current) {
            markerRef.current.setLatLng(markerPosition);
            circleRef.current.setLatLng(markerPosition);
          } else {
            markerRef.current = L.marker(markerPosition).addTo(mapRef.current);
            markerRef.current.bindPopup(`<b>${dishData[0].restaurantName}</b><br>${dishData[0].restaurantLocation}`).openPopup();
            circleRef.current = L.circle(markerPosition, {
                                color: "red",
                                fillColor: "#f03",
                                fillOpacity: 0.5,
                                radius: 10,
                                weight:1
                                }).addTo(mapRef.current);
            }
        handleFlyTo()
    },[markerPosition])

    //餐點列表
    const DishItem = ({key,dishName,price}) =>{
        //加入購物車 
        const addCart=()=>{
            const orederName = dishName[0]
            setCartContext(oldValues => {
              const productIndex = oldValues.findIndex(
                val => val.orederName === orederName
              )
              let updatedCartItems = []
              //如果 item 已經在 Cart 裡面的話
              if (productIndex !== -1) {
                updatedCartItems = [
                  //在陣列裡面該 item 前面的物件
                    ...oldValues.slice(0, productIndex),
                  //在陣列裡面同樣的那個 item 數量+1
                    {
                        orederName,
                        count: oldValues[productIndex].count + 1,
                    },
                  //在陣列裡該 item 後面的物件
                    ...oldValues.slice(productIndex + 1),
                  ]
              } else {
                //item 原本沒在 Cart 裡面 ，保留其他舊的物件， 新增 item 進去
                updatedCartItems = [...oldValues, { orederName, count: 1 }]
              }
              //把購物車資料放在 localstorage 裡面
            //   try {
            //     window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
            //   } catch (e) {
            //     console.error("Error in storing cart items in local storage")
            //   }
              return updatedCartItems
            })
        }

        return(
            <>
            <div className="row g-0 align-items-center mb-3" key={key}>
                    
                    <div className="col-3 me-4">
                        <img src="https://picsum.photos/1200/600?random=10" className="rounded-start cart_item_img " alt="..." />
                    </div>
                    <div className="col-3" >                                   
                        <div className="col-12 mx-3">
                            <h4>{dishName}</h4>
                        </div>
                    </div>
                    <div className="col-2 cost_item text-end" >
                        <h5>${price}</h5>   
                    </div>
                    <div className="col-3 cost_item text-end" >
                        <button type="button" className="btn btn-outline-primary me-2" onClick={addCart}>addCart</button>
                    </div>
                </div>
                <hr className="mt-4"/>
            </>
        )
    }
    
    return (
        <>
        <div className="col mt-4">
            <h5 style={{textAlign:'center'}}>{dishData[0].restaurantName}</h5>
        </div>
        <hr className="mt-4"/>
        <div className='container mb-4'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-8'>
                    <div id="map" style={{ height: "50vh", width: "100%", zIndex:"1",minHeight:350 }} />
                </div>
                <div className='col-12 col-md-4 mt-2'>
                    <div className='row mt-2'>
                        <div className='col-1'>
                            <i className="far fa-star"></i>
                        </div>
                        <div className='col'>
                            <h5> 1</h5>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-1'>
                            <i className="far fa-phone-alt"></i>
                        </div>
                        <div className='col'>
                            <h4>{dishData[0].restaurantPhone}</h4>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-1'>
                            <i className="far fa-clock"></i>
                        </div>
                        <div className='col'>
                            {   
                                Object.entries(dishData[0].serviceHour).map(([key,value]) => {
                                    return (
                                        <div className='row' key={key}>
                                            <div className='col-2'>
                                                <h5 className='mt-1' key={key}>
                                                    {Object.keys(value)}
                                                </h5>
                                            </div>
                                            <div className='col-1'>
                                                <h5 className='mt-1' key={key}>
                                                    :
                                                </h5>
                                            </div>
                                            <div className='col-2'>
                                                <h5 className='mt-1' key={key}>
                                                    {Object.values(value)}
                                                </h5>
                                            </div>
                                        </div>
                                        
                                        
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mb-4">
            <div className="row">
                <div className="col-12">
                {   
                    Object.entries(dishData[0].dish).map(([key,value]) => {
                        const dishName = Object.keys(value)
                        const price = Object.values(value)
                        return (
                            <>
                                <DishItem key={key} dishName={dishName} price={price}/>
                            </>
                        );
                    })
                }
                </div>    
            </div>
        </div>
        </>
    )
}
