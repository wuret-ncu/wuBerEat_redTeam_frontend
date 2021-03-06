import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useState, useContext, useCallback, useEffect} from 'react'
import { AuthContext } from '../../../global/AuthContext'
import { apiUpLoadmenu, apiUserDetailsRequest,apiContentItemEdit} from '../../../global/api'

export default function Edit({name,title,editRestaurantId}) {
    const[menuData, setMenuData] = useState({type:[],dish:[],serviceHour:[]})
    const[menuImg, setMenuImg] = useState(null)
    const[typeInput, setTypeinput] = useState("")
    const[date, setDate] = useState("Mon")
    const[time,setTime] = useState("")
    const[dish,setDish] = useState("")
    const[price,setPrice] = useState("")
    const[menuImgUrl, setmenuImgUrl] = useState("") 
    const[userContext, setUserContext] = useContext(AuthContext)
    const history = useHistory()
    
    //表單需要user資料
    const fetchUserDetails = useCallback(()=>{
        apiUserDetailsRequest({
            headers:{
                Authorization: `Bearer ${userContext.token}`}
        })
        .then(async response =>{
            if(response.statusText === 'OK'){
                const data = await response.data
                setUserContext( prevData =>{
                    return{...prevData, details : data}
                })
            }else{
                if(response.status === 401){
                    window.location.reload()
                }else{
                    setUserContext( prevData =>{
                        return{...prevData, details : null}
                    })
                }
            }
        })
    },[setUserContext, userContext.token])

    useEffect(()=>{
        if(!userContext.details){
            fetchUserDetails()
        }
    },[userContext.details, fetchUserDetails])

    //普通的表單內容
    const handleChange = e =>{
        const {name, value} = e.target;
        setMenuData( prevdata =>({
            ...prevdata,
            [name]: value
        }));
    }

    //Type input 取值
    const handleTypeChange = e =>{
        setTypeinput(e.target.value)
    }
    //放進 MenuData(物件)
    const handleTypeClick = () =>{
        setMenuData (prevData =>({
            ...prevData,
          type:[
            ...menuData.type,
            typeInput
            ]
        }));
    }
    
    //Date & Time
    const handleDateChange = e =>{
        setDate(e.target.value);
    }
    const handleTimeChange = e =>{
        setTime(e.target.value)
    }
    const handleServiceHourClick = () =>{
        setMenuData( prevData =>({
            ...prevData,
            serviceHour:[
                ...menuData.serviceHour,
                {[date]:time}
            ]
        }))
    }

    //Dish & Price
    const handleDishChange = e =>{
        setDish(e.target.value)
    }
    const handlePriceChange = e =>{
        setPrice(e.target.value)
    }
    const handleDishClick = () =>{
        setMenuData( prevdata =>({
            ...prevdata,
            dish:[
                ...menuData.dish,
                {
                    [dish]:price
                }
            ]
        }))
    }

    //圖片
    const handleImgChange = e =>{
        const file = e.target.files[0];
        setMenuImg(file);
        const fileReader = new FileReader();
        //Load監聽事件，等東西都弄好 
        fileReader.addEventListener("load",fileLoad); 
        //把file轉成字串URL
        fileReader.readAsDataURL(file); 
    }

    const fileLoad = e =>{
        //拿上面轉好的URL
        setmenuImgUrl(e.target.result) 
    }

    //建立FormDat , append 表單內容
    const handleSubmit = e =>{
        e.preventDefault();
        const formData = new FormData();
        //append 正常表單資料 
        for(var key in menuData){
            if(key === "type"){
                for(var i = 0; i < menuData[key].length; i++){
                    formData.append(`${key}[${i}]`,menuData[key][i])
                }
            }
            else if(key === "serviceHour" || key === "dish" ){
                for(var j = 0; j < menuData[key].length; j++){
                    formData.append(`${key}[${j}]`,JSON.stringify(menuData[key][j]))
                }
            }else{
                formData.append(key,menuData[key]);
            } 
        };
        //append Img
        formData.append('menu',menuImg);
        
        //append user ID
        formData.append('userId',userContext.details._id);

        //上傳菜單 or 編輯菜單
        if(name === "Edit"){
            apiContentItemEdit(editRestaurantId,formData)
            .then(response =>{
                console.log(response);
            }).catch(err =>{
                console.log(err);
            })
        }else {
            
            apiUpLoadmenu(formData)
            .then(response =>{
                console.log(response);
            }).catch(err=>{
                console.log(err);
            })
        }

        history.push('/Homepage')
    }

    return (
        <>
            <div className="container" style={{marginTop:80}}>
                <div className="d-flex justify-content-center">
                    <h5>{title}</h5>
                </div>
                <div className="row justify-content-center">
                    <form className ="form col-md-8 col-12" onSubmit={handleSubmit}>   
                        <div className='mb-3'>
                            <label className="form-label">餐廳名稱</label>
                            <input type="text" name="restaurantName" className="form-control"  placeholder="..." required onChange={handleChange}/>                        
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="menuFile" className="form-label">餐廳菜單</label>
                            <input className="form-control" name="menu" type="file" id="menuFile" required onChange={handleImgChange} />
                            <div className='mx-3 my-3' style={{textAlign:'center'}}>
                                <img  src={menuImgUrl} alt={menuImg} width={"100%"}/>
                            </div>
                        </div>
                        <label className="form-label mb-2">餐廳標籤</label>
                        <div className="input-group mb-3">
                            <input type="text" name="type" className="form-control" placeholder="..." onChange={handleTypeChange}/>
                            <button className="btn btn-outline-secondary" type="button" onClick={handleTypeClick}><i className="fas fa-plus"></i></button>
                        </div>
                        <div>
                            <div className='col mb-3'>
                                {menuData.type.map(item =>  
                                    <span style={{color:'rgb(80, 67, 161)'}}>&nbsp;#&nbsp;{item}</span> 
                                )}
                            </div> 
                        </div>
                        
                        <div className='mb-3'>
                            <label className="form-label">餐廳電話</label>
                            <input type="text" name="restaurantPhone" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">餐廳地址</label>
                            <input type="text" name="restaurantLocation" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                            <label className="form-label">餐廳營業時間</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroupSelect">日期</span>
                                <select className="form-select" id="inputGroupSelect01" onChange={handleDateChange}>
                                    <option value="Mon">星期一</option>
                                    <option value="Tue">星期二</option>
                                    <option value="Wed">星期三</option>
                                    <option value="Thu">星期四</option>
                                    <option value="Fri">星期五</option>
                                    <option value="Sat">星期六</option>
                                    <option value="Sun">星期日</option>
                                </select>
                                <span className="input-group-text">時間</span>
                                <input type="text" name="serviceHour" className="form-control" placeholder="..." onChange={handleTimeChange}/>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleServiceHourClick}><i className="fas fa-plus"></i></button>
                            </div>
                            {
                                 Object.entries(menuData.serviceHour).map(([key,value]) => {
                                    return (
                                        <div className='row' key={key}>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    {Object.keys(value)}
                                                </span>
                                            </div>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    :
                                                </span>
                                            </div>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    {Object.values(value)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        
                        <div className='mt-3 mb-3'>
                            <label className="form-label">餐廳餐點</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupSelect" >餐點</span>
                                <input type="text" name="dishName" className="form-control" placeholder="..." onChange={handleDishChange}/>
                                <span className="input-group-text">價錢</span>
                                <input type="text" name="price" className="form-control" placeholder="..." onChange={handlePriceChange}/>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleDishClick}><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                        {
                                 Object.entries(menuData.dish).map(([key,value]) => {
                                    return (
                                        <div className='row' key={key}>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    {Object.keys(value)}
                                                </span>
                                            </div>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    :
                                                </span>
                                            </div>
                                            <div className='col-1'>
                                                <span className='mt-1' key={key}>
                                                    {Object.values(value)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        
                       <button type="submit" className="btn btn-outline-warning w-100 mt-4">{name}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
