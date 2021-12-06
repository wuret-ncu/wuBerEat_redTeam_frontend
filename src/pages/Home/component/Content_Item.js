import React from 'react'
import { useEffect } from 'react';
export default function ContentItem({cardImgSrc,cardTitle, cardContent}) {

    useEffect(() => {    
        window.AOS.init({
          duration : 1000
        });
    }, []);
    return (
            <div className="col-12 col-md-3 mb-4">
                <div className="card h-100" data-aos="fade-down" data-aos-offset="250">
                    <img src={cardImgSrc} className="card-img-top" alt="..." />
                    <div className="card-body ">
                        <h5 className="card-title">{cardTitle}</h5>
                        <p className="card-text">{cardContent}</p>
                    </div>
                    <div className="card-footer border-0 p-0">
                        <button href="/#" className="btn btn-primary align-self-end w-100 ">Add to cart</button>  
                    </div>
                </div>
            </div>
    )
}
