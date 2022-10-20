import"./Formcomponents.css";
import"../fonts/Baloo2-Regular.ttf";
import axios from "axios";
import Swal from "sweetalert2";
import React,{ useState,useEffect } from "react";
import { getToken } from "../../services/authorize";

const EditKmutnblocation=(props)=>{
    const [state,setState] = useState({
        name:"",
        detail:"",
        telephone:"",
        price:"",
        slug:"",
        Image:""
    })
    const {name,detail,telephone,price,slug} = state

    //ดึงข้อมูลบทความที่ต้องการแก้ไขโดยใช้ useEffect
    const fetchData=()=>{
        axios
        //props.match.params.slug}`)
        .get(`${process.env.REACT_APP_API}/kmutnblocation/update/${props.match.params.slug}`)
        .then(response=>{
            const {name,detail,telephone,price,slug,Image} = response.data
            setState({...state,name,detail,telephone,price,slug,Image})
        })
        .catch(err=>alert(err))
        
    }
    useEffect(()=>{
        fetchData()
        //eslint-disable-next-line
    },[])
    
    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>ชื่อ</label>
                        <input type="text" classname="form-control" value={name} onChange={inputValue("name")}/>
                    </div>
                    <div className="form-group">
                        <label>รายละเอียด</label>
                        <input type="text" classname="form-control" value={detail} onChange={inputValue("detail")}/>
                    </div>
                    <div className="form-group">
                        <label>ราคา</label>
                        <input type="text" classname="form-control" value={price} onChange={inputValue("price")}/>
                    </div>
                    <div className="form-group">
                        <label>เบอร์โทรติดต่อ</label>
                        <input type="text" classname="form-control" value={telephone} onChange={inputValue("telephone")}/>
                    </div>
                    <input type="submit" value="แก้ไข" className="btn btn-primary"></input>
                </form>
    )
    //กำหนดค่าให้กับ state
    const inputValue =name=>event=>{
        //console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author})
        //console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/kmutnblocation/update/${slug}`,{name,detail,telephone,price},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน','อัพเดทบทความเรียบร้อย','success')
                const {title,content,author,slug} = response.data
                setState({...state,title,content,author,slug})
        }).catch(err=>{
            Swal.fire({icon: 'error',title: 'Oops...',text:"ERROR",footer: '<a href="">Why do I have this issue?</a>'})
            //alert(err.response.data.error)
        })
    }
    return(
        <div className="form_container">
            <div>
                <h1>แก้ไขบทความ</h1>
                <h1>Image</h1>
                <img src={`../../uploads/${state.Image}`} alt="..."/>
                {showUpdateForm()}
    
            </div>
        </div>
    );
}
export default EditKmutnblocation;