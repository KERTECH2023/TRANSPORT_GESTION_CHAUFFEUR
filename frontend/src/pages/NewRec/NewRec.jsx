/* eslint-disable no-unused-vars */
import React from 'react'
import "./newrec.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const NewRec = () => {
    const userid = window.localStorage.getItem("userId");
    console.log("id",userid)
    const [titre, setTitre] = useState()
    const [objectrec, setObjectrec] = useState()
    const [daterec, setDaterec] = useState()
    const [CiN, setCiN] = useState()
    const [agent, setagent] = useState(userid)
   

console.log("cin",CiN)


    const navigate =useNavigate()

    const handleSubmite = e => {
        // Prevent the default submit and page reload
        e.preventDefault()
    
        const CinRegex = /^[0-9]{8,12}$/;
        if (!CinRegex.test(CiN)) {
          toast.error('Le Cin doit comporter 8 chiffres Min.', {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
        }
        // Handle validations
        axios
          .post("http://localhost:3001/Rec/add", { titre,objectrec,daterec,CiN,agent })
          .then(response => {
        
            console.log(response)
            
            toast.success('Réclamation  envoyé  avec Success !', {
                position: toast.POSITION.TOP_RIGHT
                
            });
            setTimeout(()=>navigate("/Rec"),3000);
            console.log(response)
                        // Handle response
          })
         
      .catch(err =>{
        console.warn(err)
        toast.error('Verifier Votre information !', {
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
                  <h1>Ajouter Une Nouvelle Réclamation</h1>
                </div>
                <div className="bottom">
                  <div className="right">
                    <form action="" id="login" method="post" onSubmit={handleSubmite} >
                    <p className="item">
                    <label>titre Réclamtion :</label><br />
                    <input type="text" onChange={e => setTitre(e.target.value)} name="Firstname" className='InputBox' id="Firstname" value={titre || ""
                    } required />
                </p>
        
                <p className="iteme">
                    <label>Contenu Réclamation :</label><br />
                    <textarea  type="text" onChange={e => setObjectrec(e.target.value)} name="Lastname" className='InputBox' id="Lastname" value={objectrec || ""
                    } required />
                </p>
                
      
                <p className="item">
                    <label>Date Réclamation :</label><br />
                    <input type="Date" onChange={e => setDaterec(e.target.value)} name="DateNaissance" className='InputBox' id="DateNaissance" value={daterec || ""
                    } required />
                </p>
       
     
        
             
            
              
                <p className="item">
                    <label>N° CIN :</label><br />
                    <input type="text" onChange={e => setCiN(e.target.value)} name="cnicNo" className='InputBox' id="cnicNo" value={CiN || ""
                    } required />
                </p>
            
               
        
            
        
        
                <p className="item">
                    <button id="sub_btn" type="submit" value="login">AJOUTER</button>
                </p>
                <ToastContainer />
                    </form>
                 
                  </div>
                </div>
              </div>
            </div>
          );
}

export default NewRec