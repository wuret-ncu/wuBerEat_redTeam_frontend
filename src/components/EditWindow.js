import React ,{useEffect}from 'react'
import Edit from '../pages/EditMenu/component/Edit'
export default function EditWindow({hide,editRestaurantId}) {
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
    
    return (
        <div className="modal" style={modelStyle} data-aos="fade-down" data-aos-offset="250">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable justify-content-center">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title"><i className="far fa-edit"></i></h5>
                        <button type="button" className="btn-close" onClick={closemodel}/>
                    </div>
                    <div className="modal-body">
                        <Edit name={"Edit"} title={"編輯資訊"} editRestaurantId={editRestaurantId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
