/* eslint-disable no-unused-vars */
import React from 'react'
import "./singlecon.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const SingleCon = () => {
    const [user , setUser] = useState()

    const navigate =useNavigate()
    const {id} = useParams();
    const role = window.localStorage.getItem("userRole");
    console.log("role//",role)
    
    useEffect(() =>{
    if (id) {
      getSingleUser(id)
    }
    
    },[id] )
    console.log("user", id);
    
    const getSingleUser = async (id)  => {
      const response = await axios.get(`http://localhost:3001/Con/searshcon/${id}`);
      if(response.status===200){
     setUser({ ...response.data })
     console.log("data" , response.data)
      }
    }
    console.log("USER**" , user)
    
 
    
    
    
    const handleSubmite = () => {
        // Prevent the default submit and page reload
      
      
    
        // Handle validations
        axios
          .put(`http://localhost:3001/Con/upCon/${id}`
          ,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
         
          .then(response => {
         
            toast.success('Réclamation   a été Terminé avec Success !', {
              position: toast.POSITION.TOP_RIGHT
              
          });
      
            //navigate("/users")
            setTimeout(()=>navigate("/Contact"),3000);
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
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
             
                
                <h1 className="title">Information</h1>
                <div className="item">
                  
                  <div className="details">
                  <h1 className="itemTitle">
                  {user && user.status === "terminé" && "(Résolu)"}
                 
                
                  
                  </h1>
                    <h2 className="itemTitle">Nom  : {user && user.Nom} {user && user.Prenom}</h2>
                    <div className="detailItem">
                      <span className="itemKey">Nom Du Réclameur:</span>
                      <span className="itemValue">{user && user.Nom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Prenom Du Réclameur:</span>
                      <span className="itemValue">{user && user.Prenom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Téléphone Du Réclameur:</span>
                      <span className="itemValue">{user && user.Tel}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email Du Réclameur:</span>
                      <span className="itemValue">{user && user.Email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Contenu Réclamation:</span>
                      <span className="itemValue">
                      {user && user.Message}
                      </span>
                    </div>
                   
                    <div className="detailItem">
                      <span className="itemKey">Status Du Réclamation :</span>
                      <span className="itemValue">{user && user.status}</span>
                    </div>
                   
               
                           
   
                    
                    <div>
                    {role === "Admin" || role === "Agentad" ? (
              user && user.status === "terminé" ? (
                <div className="terminatedMessage">
                  Réclamation Résolu
                </div>
              ) : (
                <div className="deleteButton" onClick={() => handleSubmite()}>
                  Résoudre Cette Réclamation 
                </div>
              )
            ) : null}
    </div>

    
           
                  </div>
                 
                </div>
              </div>
              
              {/* <div className="right">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div> */}
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

export default SingleCon