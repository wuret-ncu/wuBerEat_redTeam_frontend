import React from 'react'
import Restaurant_Item from './Restaurant_Item';
import './restaurantList.css'
import {useState,useEffect, useMemo } from 'react';
import { apiContentItem } from '../../../global/api';

export default function RestaurantList({searchValue, searching, setSearching,setDishShow,setDishData}) {
    const[contentItem,setContentItem] = useState([])
    const[sortedConfig,setSortedConfig] = useState({key:null})
    const[restaurantId,setRestaurantId] = useState("")
    const[toogleType,setToogleType] = useState(false)
    //Content Item 初始 render
    useEffect(()=>{
        apiContentItem()
        .then(res=>{
            setContentItem(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    //搜尋後重發request
    useEffect(()=>{
        if(searching === true){
            apiContentItem(searchValue)
            .then(res=>{
                setContentItem(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
           setSearching(false)
        }
    },[searching])

    //把資料過濾後特定的餐廳資料傳上去給 <DishList /> 拿到
    useEffect(()=>{
        function testAsync(){
            return new Promise((resolve,reject)=>{
                //here our function should be implemented 
                const filterdata = contentItem.filter(item => item._id === restaurantId)
                resolve();
                setDishData(filterdata)
            });
        }
        
        async function callerFun(){
            await testAsync();
            if(restaurantId !== ""){
                setDishShow(true)
            }
        }
        
        callerFun();
        
    },[restaurantId])

    //sort
    const handleSortConfig = key =>{
        setToogleType(key);
        let direction = "ascending";
        if(sortedConfig.key === key && sortedConfig.direction === "ascending"){
            direction = "descending"
            setToogleType(null);
        }
        setSortedConfig({key, direction})
    }

    useMemo(()=>{
        let sortedItem = contentItem;
        if(sortedConfig !== null){
            sortedItem.sort((a, b) => {
                if (a[sortedConfig.key] < b[sortedConfig.key]) {
                  return sortedConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortedConfig.key] > b[sortedConfig.key]) {
                  return sortedConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
              });
            
        }
    },[contentItem,sortedConfig])

    
    

    return (
        <div className="container cardcontainer mt-4" style={{marginBottom:80}}>
            <div className="container mb-3">
                <div className='row justify-content-start'>
                    <div className='col col-md-3 sort-option' >
                        <button type="button" className="sort-text" onClick={()=> handleSortConfig("popular")}>
                            popular
                            {toogleType !== "popular" && <i className="fas fa-sort-up sort-icon" ></i>}
                            {toogleType === "popular" && <i className="fas fa-sort-down sort-icon2"></i>}
                        </button>
                    </div>
                    <div className='col col-md-3 sort-option'>
                        <button type="button" className="sort-text" onClick={()=> handleSortConfig("createdAt")}>
                            Date
                            {toogleType !== "createdAt" && <i className="fas fa-sort-up sort-icon" ></i>}
                            {toogleType === "createdAt" && <i className="fas fa-sort-down sort-icon2"></i>}
                        </button>
                    </div>
                    <div className='col col-md-3 sort-option'>
                        <button type="button" className="sort-text" onClick={()=> handleSortConfig("restaurantName")}>
                            Name
                            {toogleType !== "restaurantName" && <i className="fas fa-sort-up sort-icon" ></i>}
                            {toogleType === "restaurantName" && <i className="fas fa-sort-down sort-icon2"></i>}
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {contentItem.map(item =>{
                    const{ menu,restaurantName ,type, _id} = item
                    return(
                        <Restaurant_Item 
                            setDishData={setDishData}
                            setRestaurantId={setRestaurantId}
                            cardImgSrc={menu} 
                            cardTitle={restaurantName} 
                            cardContent={type}
                            key={_id}
                            id={_id}
                        />
                    );  
                })}    
            </div>
        </div>
    )
}
