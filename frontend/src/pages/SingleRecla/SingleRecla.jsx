/* eslint-disable no-unused-vars */
import React from 'react'
import "./singlereca.scss"
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
    const role = window.localStorage.getItem("userRole");
    console.log("role//",role)
    
    useEffect(() =>{
    if (id) {
      getSingleUser(id)
    }
    
    },[id] )
    console.log("user", id);
    
    const getSingleUser = async (id)  => {
      const response = await axios.get(`http://localhost:3001/Rec/searshrec/${id}`);
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
          .put(`http://localhost:3001/Rec/upRec/${id}`
          ,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
         
          .then(response => {
         
            toast.success('Réclamation   a été Terminé avec Success !', {
              position: toast.POSITION.TOP_RIGHT
              
          });
      
            //navigate("/users")
            setTimeout(()=>navigate("/Rec"),3000);
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
                  <br></br>  N° Réclamation : {user && user.NumRec}
                
                  
                  </h1>
                    <h2 className="itemTitle">Titre Du Réclamation : {user && user.titre}</h2>
                    <div className="detailItem">
                      <span className="itemKey">Nom Du Réclameur:</span>
                      <span className="itemValue">{user && user.nom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Prenom Du Réclameur:</span>
                      <span className="itemValue">{user && user.prenom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Téléphone Du Réclameur:</span>
                      <span className="itemValue">{user && user.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Date Réclamation:</span>
                      <span className="itemValue">{user && user.daterec}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Contenu Reclamation:</span>
                      <span className="itemValue">
                      {user && user.objectrec}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Rôle Du Réclameur:</span>
                      <span className="itemValue">{user && user.role  }</span>
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
                  Résoudre cette réclamation ({user && user.NumRec})
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

export default SingleC