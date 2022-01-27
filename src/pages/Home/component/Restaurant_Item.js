import React from 'react'
import './Restaurant_Item.css'
import EditWindow from '../../../components/EditWindow';
import { useState, useEffect} from 'react';
import { apiContentItemDelete } from '../../../global/api';

export default function Restaurant_Item({cardImgSrc,cardTitle, cardContent,id,setRestaurantId}) {
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
    const moreMenu = () => {
        setRestaurantId(id)
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
                              <div className="col" role="alert" >
                              <h5>#{item}</h5>
                            </div> 
                            );
                          })}
                      </div> 
                    </div>
                </div>
                <div className="card-footer px-1" style={{background:"inherit",borderColor:"inherit"}}>
                    <button type="button" className="btn btn-outline-primary me-2" onClick={moreMenu}>More...</button>
                    <button type="button" className="btn btn-outline-danger" onClick={deleteMenu}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            {modalshow && <EditWindow hide={setmodalshow}/>}
            
        </div>
           
    )
}
