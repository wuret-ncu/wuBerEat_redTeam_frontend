import React from 'react'
import './Content.css'
import {useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Content() {
    
    useEffect(() => {     //aos
        AOS.init({
          duration : 1000
        });
      }, []);

    return (
        <div className="container cardcontainer">
            <div className="row">
                <div className="col-12 col-md-3">
                    <div className="card" data-aos="fade-down" data-aos-offset="250">
                        <img src="https://picsum.photos/1200/600?random=10" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/#" className="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card" data-aos="fade-down" data-aos-offset="250">
                        <img src="https://picsum.photos/1200/600?random=10" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/#" className="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card" data-aos="fade-down" data-aos-offset="250">
                        <img src="https://picsum.photos/1200/600?random=10" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/#" className="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card" data-aos="fade-down" data-aos-offset="250">
                        <img src="https://picsum.photos/1200/600?random=10" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/#" className="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
