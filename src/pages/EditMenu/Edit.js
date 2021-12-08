import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useState, useContext, useCallback, useEffect} from 'react'
import { AuthContext } from '../../global/AuthContextapi'
import { apiUpLoadmenu, apiUserDetailsRequest  } from '../../global/api'

export default function Edit() {
    const[menuData, setMenuData] = useState({})
    const[menuImg, setMenuImg] = useState(null)
    const[menuImgUrl, setmenuImgUrl] = useState("") 
    const[userContext, setUserContext] = useContext(AuthContext)

    const fetchUserDetails = useCallback(()=>{
        apiUserDetailsRequest({
            headers:{
                Authorization: `Bearer ${userContext.token}`}
        })
        .then(async response =>{
            if(response.statusText === 'OK'){
                console.log(response);
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

    //表單
    const handleChange = (e) =>{
        const{name, value} = e.target;
        setMenuData(prevdata =>({
            ...prevdata,
            [name]:value
        }));
    }
    //圖片
    const handleImgChange = e =>{
        const file = e.target.files[0];
        setMenuImg(file);
        const fileReader = new FileReader();
        fileReader.addEventListener("load",fileLoad);
        fileReader.readAsDataURL(file);
    }

    const fileLoad = e =>{
        setmenuImgUrl(e.target.result)
    }

    //FormData
    const handleSubmit = e =>{
        e.preventDefault();
        const formData = new FormData();
        for(var key in menuData){
            formData.append(key,menuData[key]);
        };
        formData.append('menu',menuImg);
        formData.append('userId',userContext.details._id);



        apiUpLoadmenu(formData)
        .then(res =>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })

        //印出 formData
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
    }
    return (
        <>
            <Navbar />
            <div className="container" style={{marginTop:70,marginBottom:80,minHeight:"100vh"}}>
                <div className="d-flex justify-content-center">
                    <h5>新增餐廳</h5>
                </div>
                <div className="row justify-content-center">
                    <form className ="form col-md-8 col-12" onSubmit={handleSubmit}>   
                        <div>
                            <label className="form-label">餐廳名稱</label>
                            <input type="text" name="restaurantName" className="form-control"  placeholder="..." onChange={handleChange}/>                        
                        </div>
                        <div>
                            <label htmlFor="menuFile" className="form-label">餐廳菜單</label>
                            <input className="form-control" name="menu" type="file" id="menuFile" onChange={handleImgChange}></input>  
                            <div style={{textAlign:'center'}}>
                                <img className="my-1" src={menuImgUrl} alt={menuImg}/>
                            </div>
                        </div>
                        <div>
                            <label className="form-label">餐廳標籤</label>
                            <input type="text" name="type" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="form-label">餐廳電話</label>
                            <input type="text" name="restaurantPhone" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="form-label">餐廳地址</label>
                            <input type="text" name="restaurantLocation" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="form-label">餐廳營業時間</label>
                            <input type="text" name="serviceHour" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="form-label">餐廳餐點</label>
                            <input type="text" name="dish" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                       <button type="submit" className="btn btn-outline-warning w-100 mt-2">Add</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
