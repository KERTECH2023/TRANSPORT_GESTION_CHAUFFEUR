/* eslint-disable no-unused-vars */
import "./updchauf.scss"
import React from 'react'
import { useParams } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const UpdChauf = () => {

  
    
  const [photoAvatar, setphotoAvatar] = useState({file :[]})
  const [photoCin, setphotoCin] = useState({file :[]})
  const [photoPermisRec, setphotoPermisRec] = useState({file :[]})
  const [photoPermisVer, setphotoPermisVer] = useState({file :[]})
  const [photoVtc, setphotoVtc] = useState({file :[]})
  const [form, setform] = useState({})
  const role = window.localStorage.getItem("userRole");
  console.log("role",role)
  const navigate =useNavigate()

  const [user] = useState()


  const {id} = useParams();
  
  useEffect(() =>{
  if (id) {
    getSingleUser(id)
  }
  
  },[id] )
  console.log("user", id);
  
  const getSingleUser = async (id)  => {
    const response = await axios.get(`http://localhost:3001/Chauff/searchchauf/${id}`);
    if(response.status===200){
   setform({ ...response.data })
   console.log("data" , response.data)
    }
  }
  console.log("USER**" , user)
  
const onChangeHandler = (e)=>{
  setform({
      ...form,
      [e.target.name] : e.target.value,
      //photoAvatar : e.Target.files[0],
  })

}


  const handleSubmit = e => {
      // Prevent the default submit and page reload
      e.preventDefault()
    
    const data = new FormData();
    data.append('photoAvatar',e.target.photoAvatar.files[0]);
    data.append('photoCin',e.target.photoCin.files[0]);
    data.append('photoPermisRec',e.target.photoPermisRec.files[0]);
    data.append('photoPermisVer',e.target.photoPermisVer.files[0]);
    data.append('photoVtc',e.target.photoVtc.files[0]);
    console.log("fileeeeee",photoAvatar)
    for (const key in form) {
      data.append(key, form[key]);
    }

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error('Phone number must be 8 digits.', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    const LiceRegex = /^[0-9]{8}$/;
    if (!LiceRegex.test(form.licenseNo)) {
    toast.error('N° Permis  must be 8 digits.', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    const CinRegex = /^[0-9]{8}$/;
    if (!CinRegex.test(form.cnicNo)) {
      toast.error('Cin number must be 8 digits.', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    
  
      // Handle validations
      axios
        .put(`http://localhost:3001/Chauff/updatechauf/${id}`,data
        ,{ headers: {
          'Content-Type': 'multipart/form-data',
        },})
       
        .then(response => {
       
          toast.success('Chauffeur Updated with Success !', {
            position: toast.POSITION.TOP_RIGHT
            
        });
        console.log("file",response.data)
          //navigate("/users")
          setTimeout(()=>navigate("/Chauffeur"),3000);
          console.log(response.Nom)
    
          
        
                      // Handle response
        })
       
    .catch(err =>{
      console.warn(err)
      toast.error('Email exist Already !', {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    
      }


      return (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>Mettre  a jour Agent : {form.Nom} </h1>
            </div>
            <div className="bottom">
              <div className="right">
                <form action="" id="login" method="put" onSubmit={handleSubmit} >
                <p className="item">
                <label>Nom :</label><br />
                <input type="text" onChange={onChangeHandler} name="Nom" className='InputBox' id="Nom" value={form.Nom || ""
                } required /> 
            </p>
    
            <p className="item">
                <label>Prenom :</label><br />
                <input type="text" onChange={onChangeHandler} name="Prenom" className='InputBox' id="Prenom" value={form.Prenom || ""
                } required />
            </p>
            
            <p className="item">
                <label>Email :</label><br />
                <input type="email" onChange={onChangeHandler} name="email" className='InputBox' id="email" value={ form.email || ""
                } required  disabled={role === "Agent"} />
            </p>
    
            <p className="item">
                <label>Phone :</label><br />
                <input type="text" onChange={onChangeHandler} name="phone" className='InputBox' id="phone" value={form.phone || ""
                } required />
            </p>
            

            <p className="item">
<label>Gender :</label><br />

        <select onChange={onChangeHandler} value={form.gender || ""} name="gender" id="gender" >
        <option value="-">-</option>
    		<option value="male">male</option>
    		<option value="female">female</option>
    		
    		
   		</select>
       </p>

    

       <p className="item">
<label>Nationalite :</label><br />
        <select onChange={onChangeHandler} value={form.Nationalite || ""} name="Nationalite" id="Nationalite" >
        <option value="-">-</option>
    		<option value="Tunisian">Tunisian</option>
    		<option value="Francais">Francais</option>
        <option value="marocain">marocain</option>
    		
    		
   		</select>
       </p>

       <p className="item">
                <label>N° Permis :</label><br />
                <input type="text" onChange={onChangeHandler} name="licenseNo" className='InputBox' id="licenseNo" value={form.licenseNo || ""
                } required   disabled={role === "Agent"}/>
            </p>
            <p className="item">
                <label>N° CIN :</label><br />
                <input type="text" onChange={onChangeHandler} name="cnicNo" className='InputBox' id="cnicNo" value={form.cnicNo || ""
                } required   disabled={role === "Agent"} />
            </p>
            <p className="item">
                <label>Adresse :</label><br />
                <input type="text" onChange={onChangeHandler} name="address" className='InputBox' id="address" value={form.address || ""
                } required />
            </p>
            <p className="item">
                <label>Code Postale :</label><br />
                <input type="text" onChange={onChangeHandler} name="postalCode" className='InputBox' id="postalCode" value={form.postalCode || ""
                } required />
            </p>
            
         
            <p className="item">
                <label>photo de profil  :</label><br />
                <img
                src={form.photoAvatar || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoAvatar(e.target.files[0])} name="photoAvatar" className='InputBox' id="photoAvatar" />
                
            </p>
    
            <p className="item">
                <label>photo de CIN  :</label><br />
                <img
                src={form.photoCin || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoCin(e.target.files[0])} name="photoCin" className='InputBox' id="photoCin" />
                
            </p>
            <p className="item">
                <label>photo de Permis Recto  :</label><br />
                <img
                src={form.photoPermisRec || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoPermisRec(e.target.files[0])} name="photoPermisRec" className='InputBox' id="photoPermisRec" />
                
            </p>
            <p className="item">
                <label>photo de Permis Verso  :</label><br />
                <img
                src={form.photoPermisVer || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoPermisVer(e.target.files[0])} name="photoPermisVer" className='InputBox' id="photoPermisVer" />
                
            </p>
            <p className="item">
                <label>photo de VTC  :</label><br />
                <img
                src={form.photoVtc || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoVtc(e.target.files[0])} name="photoVtc" className='InputBox' id="photoVtc" />
                
            </p>
            
            
            <p className="item">
                <button id="sub_btn" type="submit" value="login">Mis A Jour</button>
            </p>
            <ToastContainer />
                </form>
             
              </div>
            </div>
          </div>
        </div>
      );

}

export default UpdChauf