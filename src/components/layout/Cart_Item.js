import React from 'react';
import './Cart_Item.css'

export default function CartItem() {
    return (
    <div className="container mb-4">
        <div className="row">
            <div className="col-12">
                <div className="row g-0 align-items-center">
                    <div className="col-6 col-md-3">
                        <img src="https://picsum.photos/1200/600?random=10" className="rounded-start cart_item_img" alt="..." />
                    </div>
                    <div className="col-6 col-md-3 item_name">
                        <h5>Item name</h5>
                    </div>
                    <div className="col-6 col-md-3 mt-2 order_col"> 
                        <button type="button" className="btn btn-secondary order_item_btn"><i className="fas fa-plus"></i></button>
                        <input type="text" name="count" className="order_item_num" placeholder="1"/>
                        <button type="button" className="btn btn-secondary order_item_btn"><i className="fas fa-minus"></i></button> 
                    </div>
                    <div className="col-3 col-md-2 cost_item mt-2">
                        <h5>cost</h5>   
                    </div>
                    <div className="col-3 col-md-1 del_item mt-2">
                        <a  href="/#"><i className="fas fa-trash"></i></a>    
                    </div>  
                </div>
            </div>    
        </div>
        
    </div>
    )
}
