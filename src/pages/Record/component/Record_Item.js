import React from 'react';
import { useState } from 'react';
import EditWindow from '../../../components/EditWindow';

export default function RecordItem({dish,restaurantName}) {
    const [modalshow,setmodalshow] = useState(false)
    
    
    const handleCommet = () =>{
        setmodalshow(true)
      }

   

    
    return (
    <div className="row mb-4">
        <h5>{restaurantName}</h5>
        {
            Object.entries(dish).map(([key,value],index)=>{
                return(
                    <div key={index}>
                        <div className="col-12">
                            <div className="row g-0 align-items-center">
                                <div className="col-3 me-4">
                                    <img src="https://picsum.photos/1200/600?random=10" className="rounded-start cart_item_img " alt="..." />
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12 mx-3">
                                            <h5>{Object.keys(value)}</h5>
                                        </div>
                                        <div className="col-12 mx-3">
                                            <h5>count&nbsp;:&nbsp;1</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 cost_item text-center">
                                    <h5>{Object.values(value)}</h5>   
                                </div>
                                <div className="col cost_item text-center">
                                    <div>
                                         
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <hr className="mt-4"/>
                    </div>
                )
            })
        }    
        <div className='row justify-content-end'>
            <div className='col text-end'>
                <button type="button" class="btn btn-outline-secondary" onClick={handleCommet}>評價</button>&nbsp;
                {modalshow && <EditWindow hide={setmodalshow}/>}
            </div>
            
        </div>  
    </div>
    )
}
