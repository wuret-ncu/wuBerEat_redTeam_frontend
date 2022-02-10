import React ,{useState,useEffect}from 'react'
import Edit from '../pages/EditMenu/component/Edit'
export default function EditWindow({hide}) {
    const[commentBody,setCommentBody] = useState('')
    const[currentValue, setCurrentValue] = useState(0)
    const[hoverValue, setHoverValue] = useState(undefined)
    
    const color ={
        orange:"#FFBA5A",
        gray:"#a9a9a9"
    }

    let modelStyle ={
        display:'block',
        backgroundColor:'rgba(156, 156, 156,0.7)'
    }
    
    const closemodel = () =>{
        hide(false)
    }

    useEffect(() => {    
        window.AOS.init({
          duration : 500
        });
    }, []);

    const handleClick = value =>{
        setCurrentValue(value)
    }

    const handleMouseOver = value =>{
        setHoverValue(value)
    }

    const handleMouseLeave = () =>{
        setHoverValue(undefined)
    }

    const StarRate = () =>{
        const stars = Array(5).fill(0)
        return(
            stars.map((_, index)=>{
                return(
                    <i 
                        className="fas fa-star"
                        key={index} 
                        style={{
                            cursor:"pointer",
                            color : (hoverValue || currentValue) > index ? color.orange : color.gray
                        }}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave = {handleMouseLeave}
                    ></i>
                    
                );
            })
        );
    }

    const CommentArea = () =>{
        return(
            <>
            <h5 className='text-start'>Leave a Comment :</h5>
            <div className='row justify-content-center mb-2 mt-2'>
                <div className='col-10'>
                    <textarea 
                        className='w-100'
                        style={{height:100}}
                        required 
                        onChange={(e) => setCommentBody(e.target.value)}
                    ></textarea>
                    <div className='col-6 text-start'>
                        <StarRate />
                    </div>
                </div>
            </div>
                <div className='row justify-content-end'>
                    <div className='col-2'>
                        <button type="submit" className="btn btn-outline-secondary">Comment</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="modal" style={modelStyle} data-aos="fade-down" data-aos-offset="250">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable justify-content-center">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title"><i className="far fa-edit"></i></h5>
                        <button type="button" className="btn-close" onClick={closemodel}/>
                    </div>
                    <div className="modal-body">
                        {/* <Edit name={"Edit"} title={"編輯資訊"}/> */}
                        <CommentArea />
                    </div>
                </div>
            </div>
        </div>
    )
}
