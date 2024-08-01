import React from 'react'
import "./updatestat.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const SingleC = () => {

    const [user , setUser] = useState()

    const navigate =useNavigate()
    const {id} = useParams();
    const userRole = window.localStorage.getItem("userRole");
    console.log("role//",userRole)
    
    useEffect(() =>{
    if (id) {
      getSingleAg(id)
      getSingleUser(id)
      
      getSingleClient(id)
    }
    
    },[id] )
    console.log("user", id);
    
    const getSingleUser = async (id)  => {
      const response = await axios.get(`http://localhost:3001/Chauff/searchchauf/${id}`);
      if(response.status===200){
     setUser({ ...response.data })
     console.log("data" , response.data)
      }
    }
    const getSingleClient = async (id)  => {
      const response = await axios.get(`http://localhost:3001/Client/searchCl/${id}`);
      if(response.status===200){
     setUser({ ...response.data })
     console.log("data" , response.data)
      }
    }
    const getSingleAg = async (id)  => {
        const response = await axios.get(`http://localhost:3001/agent/searchAg/${id}`);
        if(response.status===200){
       setUser({ ...response.data })
       console.log("data" , response.data)
        }
      }
    console.log("USER**" , user)
    
    
  const handleSubmiteC = () => {
    // Prevent the default submit and page reload
  
  

    // Handle validations
    axios
      .put(`http://localhost:3001/Chauff/updatestatuss/${id}`
      ,{ headers: {
        'Content-Type': 'multipart/form-data',
      },})
     
      .then(response => {
     
        toast.success('Compte Chauffeur  a été Activé avec Success !', {
          position: toast.POSITION.TOP_RIGHT
          
      });
  
        //navigate("/users")
        setTimeout(()=>navigate("/Chauffeur"),5000);
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

    const handleSubmite = () => {
        // Prevent the default submit and page reload
      
      
    
        // Handle validations
        axios
          .put(`http://localhost:3001/agent/updatestatuss/${id}`
          ,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
         
          .then(response => {
         
            toast.success('Compte Agent  a été Activé avec Success !', {
              position: toast.POSITION.TOP_RIGHT
              
          });
      
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
    
    
        
    const handleSubmiteCl = () => {
      // Prevent the default submit and page reload
    
    
  
      // Handle validations
      axios
        .put(`http://localhost:3001/Client/updatestatuss/${id}`
        ,{ headers: {
          'Content-Type': 'multipart/form-data',
        },})
       
        .then(response => {
       
          toast.success('Compte Client  a été Activé avec Success !', {
            position: toast.POSITION.TOP_RIGHT
            
        });
    
          //navigate("/users")
          setTimeout(()=>navigate("/Client"),3000);
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
        <div className="singlee">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
             
                
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={user && user.photoAvatar}
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{user && user.Nom} {user && user.Prenom}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Nom:</span>
                      <span className="itemValue">{user && user.Nom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">UserName:</span>
                      <span className="itemValue">{user && user.username}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Prenom:</span>
                      <span className="itemValue">{user && user.Prenom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Nationalite:</span>
                      <span className="itemValue">{user && user.Nationalite}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">email:</span>
                      <span className="itemValue">
                      {user && user.email}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">DateNaissance:</span>
                      <span className="itemValue">{user && user.DateNaissance  }</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">gender:</span>
                      <span className="itemValue">{user && user.gender}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">role:</span>
                      <span className="itemValue">{user && user.role}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{user && user.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Adresse:</span>
                      <span className="itemValue">{user && user.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Code Postal:</span>
                      <span className="itemValue">{user && user.postalCode}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">N° Permis:</span>
                      <span className="itemValue">{user && user.licenseNo}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">N° CIN:</span>
                      <span className="itemValue">{user && user.cnicNo}</span>
                    </div>



                    {userRole && (userRole === 'Admin' || userRole === 'Agentad') && (
  <>
    <div>
      {user?.role !== 'Chauffeur' && user?.role !== 'Client' &&  (
        <div
          className="deleteButton"
          onClick={() => handleSubmite()}
        >
          Activé Ce Compte
        </div>
      )}
    </div>
    <div>
      {user?.role === 'Chauffeur' &&  (
        <div
          className="deleteButton"
          onClick={() => handleSubmiteC()}
        >
          Activé Ce Compte
        </div>
      )}
    </div>
    <div>
      {user?.role === 'Client' && (
        <div
          className="deleteButton"
          onClick={() => handleSubmiteCl()}
        >
          Activé Ce Compte
        </div>
      )}
    </div>
  </>
)}
    
           
                  </div>
                 
                </div>
              </div>
              
              <div className="right">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div>
            </div>
            <ToastContainer />
            {/* <div className="bottom">
            <h1 className="title">Last Transactions</h1>
              <List/>
            </div> */}
          </div>
        </div>
      );
}

export default SingleC