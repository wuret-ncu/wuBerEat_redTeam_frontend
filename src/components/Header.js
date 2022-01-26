import React from 'react';
import './Header.css';
export default function Header({setSearchValue, setSearching}) {

    const handleSearchChange = e =>{
        setSearchValue(e.target.value)
    }
    const handleSearching = ()=>{
        setSearching(true)
    }
    return (
        <div>
            <div className="container kv">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-sm-10">
                        <h1>今晚我想來點...</h1>
                        <div className="search">
                            <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchChange}/> 
                            <button className="btn btn-outline-dark" onClick={handleSearching}>
                                <i className="fas fa-search"></i>
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
