import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useState} from 'react'
import { apiUpLoadmenu } from '../../global/api'

export default function Edit() {
    const[menuData, setMenuData] = useState({})
    const[menuImg, setMenuImg] = useState(null)
    const[menuImgUrl, setmenuImgUrl] = useState("") 

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
        formData.append('file',menuImg);


        apiUpLoadmenu(formData)
        .then(res =>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })

        //印出 formData
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
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
                            <input type="text" name="reataurantName" className="form-control"  placeholder="..." onChange={handleChange}/>                        
                        </div>
                        <div>
                            <label htmlFor="menuFile" className="form-label">餐廳菜單</label>
                            <input className="form-control" type="file" id="menuFile" onChange={handleImgChange}></input>  
                            <div style={{textAlign:'center'}}>
                                <img className="my-1" src={menuImgUrl} alt={menuImg}/>
                            </div>
                        </div>
                        <div>
                            <label className="form-label">餐廳電話</label>
                            <input type="text" name="reataurantPhone" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="form-label">餐廳營業時間</label>
                            <input type="text" name="servicetime" className="form-control" placeholder="..." onChange={handleChange}/>
                        </div>
                       <button type="submit" className="btn btn-outline-warning w-100 mt-2">Add</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
