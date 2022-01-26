import React from 'react'
import { useState, useEffect, useRef } from 'react';



export default function DishList({dishData}) {
    const [markerPosition, setMarkerPosition] = useState({lat:24.968281,lng:121.192889});
    const {lat,lng} = markerPosition;
    const google = window.google; //Google Geocode Api
    const L = window.L; //Leaflet.js
    const mapRef = useRef(null); 
    const markerRef = useRef(null); 
    const circleRef = useRef(null); 

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


    
    return (
        <>
        <div className="col mt-4">
            <h5 style={{textAlign:'center'}}>{dishData[0].restaurantName}</h5>
        </div>
        <hr className="mt-4"/>
        <div className='container mb-4'>
            <div className='row justify-content-start'>
                <div className='col-12 col-md-8'>
                    <div id="map" style={{ height: "50vh", width: "100%", zIndex:"1" }} />
                </div>
                <div className='col-12 col-md-4'>
                    <div className='row'>
                        <div className='col-1'>
                            <i className="far fa-star"></i>
                        </div>
                        <div className='col'>
                            <h5> 1</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'>
                            <i className="far fa-phone-alt"></i>
                        </div>
                        <div className='col'>
                            <h4>{dishData[0].restaurantPhone}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'>
                            <i className="far fa-clock"></i>
                        </div>
                        <div className='col'>
                            {   
                                dishData[0].serviceHour.map(item => {
                                    const{date,time} = item
                                    return (
                                        <p key={date}>
                                            {date} : {time}
                                        </p>
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
                            dishData[0].dish.map(item => {
                                const{dishName,price} = item
                                return (
                                    <div className="row g-0 align-items-center">
                                    <div className="col-3 me-4">
                                        <img src="https://picsum.photos/1200/600?random=10" className="rounded-start cart_item_img " alt="..." />
                                    </div>
                                    <div className="col-4" >
                                        
                                            <div className="col-12 mx-3">
                                                <h5>{dishName}</h5>
                                            </div>
                                        
                                    </div>
                                        <div className="col cost_item text-end" key={price}>
                                        <h5>${price}</h5>   
                                    </div>
                                    </div>
                                );
                            })
                        }
                    
                </div> 
                <hr className="mt-4"/>   
            </div>
        </div>
        </>
    )
}
