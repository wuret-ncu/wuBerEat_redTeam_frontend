import React from 'react';

export default function RecordItem({dish,restaurantName}) {
    return (
    <div className="row mb-4">
        <h5>{restaurantName}</h5>
        {
            Object.entries(dish).map(([key,value])=>{
                return(
                    <>
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
                                <div className="col cost_item text-end">
                                    <h5>{Object.values(value)}</h5>   
                                </div>
                            </div>
                        </div> 
                        <hr className="mt-4"/>
                    </>
                )
            })
        }    
    </div>
    )
}
