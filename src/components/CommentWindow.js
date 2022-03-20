import React ,{useState,useEffect,useContext}from 'react'
import { apiUserDetailsRequest,apiCreateScore,apiCreateMessage} from '../global/api'
import { AuthContext } from '../global/AuthContext';
export default function CommentWindow({hide,editRestaurantId}) {
    const [userContext, setUserContext] = useContext(AuthContext)
    const [userId,setUserId] = useState("")
    const[commentBody,setCommentBody] = useState("")
    const[currentValue, setCurrentValue] = useState(0)
    const[hoverValue, setHoverValue] = useState(undefined)

    //get user ID
    useEffect(()=>{
        apiUserDetailsRequest({
            headers:{
                Authorization: `Bearer ${userContext.token}`}
        })
        .then(async response =>{
            if(response.statusText === 'OK'){
                const data = await response.data
                setUserId(data._id)
            }else{
                if(response.status === 401){
                    window.location.reload()
                }
            }
        })
    },[])
    
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

    //count star
    const handleClick = value =>{
        setCurrentValue(value)
    }

    const handleMouseOver = value =>{
        setHoverValue(value)
    }

    const handleMouseLeave = () =>{
        setHoverValue(undefined)
    }

    //request CreateScore & CreateMessage
    const handleSubmit= () =>{
        const userCommentData = {
            restaurantId:"61f1796332fc13ee449e47bc", 
            userId:userId, 
            content:commentBody
        }
        const userScoreData = {
            restaurantId:"61f1796332fc13ee449e47bc", 
            userId:userId, 
            score:currentValue
        }
        apiCreateScore(userScoreData)
        .then(response =>{
            console.log(response);
        }).catch(err =>{
            console.log(err);
        })

        apiCreateMessage(userCommentData)
        .then(response =>{
            console.log(response);
        }).catch(err =>{
            console.log(err);
        })
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
                <div className='col-12 col-md-10'>
                    <input 
                        className='w-100'
                        onChange={(e) => setCommentBody(e.target.value)}
                        value={commentBody}
                    />
                    <div className='col-6 text-start'>
                        <StarRate />
                    </div>
                </div>
            </div>
                <div className='row justify-content-end'>
                    <div className='col-4 col-lg-2'>
                        <button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit}>Comment</button>
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
                        <CommentArea />
                    </div>
                </div>
            </div>
        </div>
    )
}