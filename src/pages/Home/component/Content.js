import React from 'react'
import ContentItem from './Content_Item';
import {useState,useEffect } from 'react';
import { apiContentItem } from '../../../global/api';

export default function Content() {
    const[contentItem,setContentItem] = useState([])
    
    //Content Item 
    useEffect(() => {    
        apiContentItem()
        .then(res=>{
            setContentItem(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    return (
        <div className="container cardcontainer mt-5" style={{marginBottom:80}}>
            <div className="row">
                {contentItem.map(item =>{
                    const{ url, title, id} = item
                    return(
                        <ContentItem 
                            cardImgSrc={url} 
                            cardTitle={id} 
                            cardContent={title}
                            key={id}
                        />
                    );  
                })}    
            </div>
        </div>
    )
}
