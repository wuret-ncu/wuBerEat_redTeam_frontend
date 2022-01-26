import React from 'react'

export default function Loader() {
    const loderStle ={
        height :'100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={loderStle}>
            <div className="spinner-border text-warning" role="status" style={{width:70, height:70}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>   
    )
}
