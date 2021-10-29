import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Cart.css';

export default function Cart() {
    return (
        <div>
        <Navbar />
        <div className="container cartkv">
            <div className="row justify-content-center align-items-center">
                <div className="col-mb-8">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://picsum.photos/1200/600?random=10" className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Item name</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>    
        </div>    
    )
}