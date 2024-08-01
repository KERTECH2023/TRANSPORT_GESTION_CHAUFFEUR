import "./updcl.scss"
import React from 'react'
import { useParams } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const UpdCl = () => {

  const role = window.localStorage.getItem("userRole");
  console.log("role",role)

  
    
    const [photoAvatar, setphotoAvatar] = useState({file :[]})
    const [form, setform] = useState({})

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
      const response = await axios.get(`http://localhost:3001/agent/searchAg/${id}`);
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
      console.log("fileeeeee",photoAvatar)
        // Handle validations

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
      
        axios
          .put(`http://localhost:3001/agent/updateAg/${id}`,data
          ,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
         
          .then(response => {
         console.log('res',response)
            toast.success('Agent Updated with Success !', {
              position: toast.POSITION.TOP_RIGHT
              
          });
          console.log("file",response.data)
            //navigate("/users")
            setTimeout(()=>navigate("/users"),3000);
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
                } required  />
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
<label>Role :</label><br />
        <select onChange={onChangeHandler} value={form.role || ""} name="role" id="role"  disabled={role === "Agent"} >
        <option value="-">-</option>
    		<option value="comptabilité">comptabilité</option>
    		<option value="ressources_humaines">ressources humaines</option>
        <option value="communication">communication</option>
        <option value="service_juridique">service juridique</option>
    		
    		
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
                <label>photo de profil  :</label><br />
                <img
                src={form.photoAvatar || ""}
                alt=""
                className="itemImg"
              />
             
                <input type="file"   onChange={e => setphotoAvatar(e.target.files[0])} name="photoAvatar" className='InputBox' id="photoAvatar" />
                
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

export default UpdCl