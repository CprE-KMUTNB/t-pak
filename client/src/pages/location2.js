import axios from "axios";
import { useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import './Location_and_Roomate.css'
import Select from "react-select";
const Kmutnblocation=(props)=>{
    const place = props.location.state.userChoice2.toUpperCase()
    const mode = props.location.state.userChoice
    const uniOptions = [
        { value: 'KMUTNB', label: 'KMUTNB' },
        { value: 'KMITL', label: 'KMITL' },
        { value: 'KMUTT', label: 'KMUTT' },
        { value: 'TU', label: 'TU' },
        { value: '', label: 'มหาลัยทั้งหมด' }
    ]; 
    const modeOptions = [
        { value: "location", label: "หอพัก" },
        { value: "roomate", label: "รูมเมท" },
        { value: '', label: 'รูปแบบทั้งหมด' }
    ];
    const priceOptions = [
        { value: "0", label: "ราคาทั้งหมด" },
        { value: "4001", label: "4000 ขึ้นไป" },
        { value: "8002", label: "8000 ขึ้นไป" },
    ];
    const gendertypeOptions = [
        { value: 'หอพักชาย', label: 'หอพักชาย' },
        { value: 'หอพักหญิง', label: 'หอพักหญิง' },
        { value: 'หอพักรวม', label: 'หอพักรวม' },
        { value: '', label: 'หอพักทั้งหมด' },
        
    ]           
    const [uniSelect,setUniSelect]= useState(place)
    const [modeSelect,setModeSelect]= useState(mode)
    const [priceSelect,setPriceSelect]= useState('0')
    const [gender, setGender] = useState('')
    const [locations,setlocations] = useState([])
    const [roomates,setRoomates] = useState([])
    
    
    const fetchData=()=>{
        if (modeSelect==''){
            axios.all([
                axios
                .post(`${process.env.REACT_APP_API}/location/UNI`,{uniSelect,gender,priceSelect})
                .then(response=>{
                    setlocations(response.data)
                })
                .catch(err=>alert(err)), 
                axios.post(`${process.env.REACT_APP_API}/roomate/UNI`,{uniSelect,gender,priceSelect})
                .then(response=>{
                    setRoomates(response.data)
                })
                .catch(err=>alert(err)), 
            ])
        }
        if (modeSelect=='location'){
            
            axios
            .post(`${process.env.REACT_APP_API}/location/UNI`,{uniSelect,gender,priceSelect})
            .then(response=>{
                setlocations(response.data)
            })
    }
        else if(modeSelect=='roomate') {
            axios
            .post(`${process.env.REACT_APP_API}/roomate/UNI`,{uniSelect,gender,priceSelect})
            .then(response=>{
                setRoomates(response.data)
            })
            .catch(err=>alert(err));
        
        
        }
    }
    //console.log(uniSelect)
    useEffect(()=>{
        fetchData()
    },[uniSelect])
    useEffect(()=>{
        fetchData()
    },[modeSelect])
    useEffect(()=>{
        fetchData()
    },[priceSelect])
    useEffect(()=>{
        fetchData()
    },[gender])
    if (modeSelect==''){
        return(
            <div className="post-container">
                <h1>ค้นหาจากสถานที่  {uniSelect.toUpperCase()}</h1>
                <div className="select-container">
                    <Select  defaultValue={{label:'เลือกมหาลัย..'}}isSearchable={false} options={uniOptions} onChange={(choice) => setUniSelect(choice.value)}/>
                    <Select   defaultValue={{label:`รูปแบบ...`}} isSearchable={false} options={modeOptions} onChange={(choice) => setModeSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ช่วงราคา...`,value:"0"}} isSearchable={false} options={priceOptions} onChange={(choice) =>setPriceSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ปรเภท...`}} isSearchable={false} options={gendertypeOptions} onChange={(choice) =>setGender(choice.value)}/>
                </div>
                <hr/>
                {locations.map((location,index)=>(
                <div className="row" key={index} style={{border:'3px solid grey'}}>
                    <div className="column" key={index} >
                        <img src={`./uploads/${location.Image}`} alt="..."/>
                        <div className="info">
                            <h1>{location.name}</h1>
                            <p>รูปแบบ :{location.type}</p>
                            <p>ประเภท : {location.gender}</p>
                            <p className="text-muted">ราคา : {location.price} บาท/เดือน </p>
                            <p>รายละเอียด : {location.detail.substring(0,180)}</p>
                            <p className="text-muted3">เบอร์โทรศัพท์: {location.telephone}</p>
                        </div>
                        <button className="select"> 
                            <Link to={`/location/${location.slug}`}>
                                select
                            </Link>
                        </button>
                    </div>
                </div>
                ))}
                <hr/>
                <h1>ค้นหาจากรูมเมท  {uniSelect.toUpperCase()}</h1>
                {roomates.map((Roomate,index)=>(
                <div className="row" key={index} style={{border:'3px solid grey'}}>
                    <div className="column" key={index} >
                        <img src={`./uploads/${Roomate.Image}`} alt="..."/>
                        <div className="info">
                            <p>ชื่อ : {Roomate.name}</p>
                            <p>มหาวิทยาลัย : {Roomate.UNI}</p>
                            <p>เพศ : {Roomate.gender}</p>
                            <p>ชั้นปี : {Roomate.year}</p>
                            <p className="text-muted">ราคาต่อคน : {Roomate.price} บาท/คน </p>
                            <p>รายละเอียด : {Roomate.detail.substring(0,180)}</p>
                            <p className="text-muted3">เบอร์โทรศัพท์: {Roomate.telephone}</p>
                        </div>
                        <button className="select"> 
                            <Link to={`/roomate/${Roomate.slug}`}>
                                select
                            </Link>
                        </button>
                    </div>
                </div>
                    ))}
            </div>
        )
    }
    else if (modeSelect=='location'){
        return(
            <div className="post-container">
                <h1>ค้นหาจากสถานที่  {uniSelect.toUpperCase()}</h1>
                <div className="select-container">
                    <Select  defaultValue={{label:'เลือกมหาลัย..'}}isSearchable={false} options={uniOptions} onChange={(choice) => setUniSelect(choice.value)}/>
                    <Select   defaultValue={{label:`รูปแบบ...`}} isSearchable={false} options={modeOptions} onChange={(choice) => setModeSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ช่วงราคา...`,value:"0"}} isSearchable={false} options={priceOptions} onChange={(choice) =>setPriceSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ปรเภท...`}} isSearchable={false} options={gendertypeOptions} onChange={(choice) =>setGender(choice.value)}/>
                </div>
                <hr/>
                {locations.map((location,index)=>(
                <div className="row" key={index} style={{border:'3px solid grey'}}>
                    <div className="column" key={index} >
                        <img src={`./uploads/${location.Image}`} alt="..."/>
                        <div className="info">
                            <h1>{location.name}</h1>
                            <p>รูปแบบ :{location.type}</p>
                            <p>ประเภท : {location.gender}</p>
                            <p className="text-muted">ราคา : {location.price} บาท/เดือน </p>
                            <p>รายละเอียด : {location.detail.substring(0,180)}</p>
                            <p className="text-muted3">เบอร์โทรศัพท์: {location.telephone}</p>
                        </div>
                        <button className="select"> 
                            <Link to={`/location/${location.slug}`}>
                                select
                            </Link>
                        </button>
                    </div>
                </div>
                ))}
            </div>
        )
    }
    else{
        return(
            <div className="post-container">
                <h1>ค้นหาจากรูมเมท  {uniSelect.toUpperCase()}</h1>
                <div className="select-container">
                    <Select   defaultValue={{label:'เลือกมหาลัย..',value:'Location'}} isSearchable={false} options={uniOptions} onChange={(choice) => setUniSelect(choice.value)}/>
                    <Select  defaultValue={{label:`รูปแบบ...`}}  isSearchable={false} options={modeOptions} onChange={(choice) => setModeSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ช่วงราคา...`}} isSearchable={false} options={priceOptions} onChange={(choice) =>setPriceSelect(choice.value)}/>
                    <Select   defaultValue={{label:`ปรเภท...`}} isSearchable={false} options={gendertypeOptions} onChange={(choice) =>setGender(choice.value)}/>
                </div>
                <hr/>
                {roomates.map((Roomate,index)=>(
                <div className="row" key={index} style={{border:'3px solid grey'}}>
                    <div className="column" key={index} >
                        <img src={`./uploads/${Roomate.Image}`} alt="..."/>
                        <div className="info">
                            <p>ชื่อ : {Roomate.name}</p>
                            <p>มหาวิทยาลัย : {Roomate.UNI}</p>
                            <p>เพศ : {Roomate.gender}</p>
                            <p>ชั้นปี : {Roomate.year}</p>
                            <p className="text-muted">ราคาต่อคน : {Roomate.price} บาท/คน </p>
                            <p>รายละเอียด : {Roomate.detail.substring(0,180)}</p>
                            <p className="text-muted3">เบอร์โทรศัพท์: {Roomate.telephone}</p>
                        </div>
                        <button className="select"> 
                            <Link to={`/roomate/${Roomate.slug}`}>
                                select
                            </Link>
                        </button>
                    </div>
                </div>
                    ))}
            </div>
        )

    }
}
export default Kmutnblocation;
/*
<Link to={'/'}>
                                <h2>{kmutnblocation.Name}</h2>
                            </Link>
                            */




    

            
            
