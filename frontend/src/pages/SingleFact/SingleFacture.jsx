import React from 'react'
import "./SingleF.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import List from "../../components/table/Table";
import ListVoi from '../../components/tablevoiture/TableVoi';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const SingleF = () => {


    const navigate =useNavigate()
    const {id} = useParams();
    const role = window.localStorage.getItem("userRole");
    console.log("role//",role)
    
    const [facture, setFacture] = useState(null);
  const [chauffeur, setChauffeur] = useState(null);
  const getChauffeurById = async (id) => {
    const response = await fetch(`http://localhost:3001/Chauff/searchchauf/${id}`);
    const data = await response.json();
    return data;
  };
  const getFactureById = async (id) => {
    const response = await fetch(`http://localhost:3001/Chauff/factures/${id}`);
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const factureData = await getFactureById(id);
        setFacture(factureData);

        if (factureData.chauffeur) {
          const chauffeurData = await getChauffeurById(factureData.chauffeur);
          setChauffeur(chauffeurData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

   // console.log("USER**" , )
    
    //const base64PhotoAvatar = user ? Buffer.from(user.photoAvatar.data).toString('base64') : null;
    
    

//   const handleSubmit = () => {
//     // Prevent the default submit and page reload
  
  

//     // Handle validations
//     axios
//       .put(`http://localhost:3001/Chauff/factures/updateFact/${id}`
//       ,{ headers: {
//         'Content-Type': 'multipart/form-data',
//       },})
     
//       .then(response => {
     
//         toast.success('Facture bien payé !', {
//           position: toast.POSITION.TOP_RIGHT
          
//       });
  
//         //navigate("/users")
//         setTimeout(()=>navigate("/ConsultInvoices"),3000);
//         console.log(response.Nom)
  
        
      
//                     // Handle response
//       })
     
//   .catch(err =>{
//     console.warn(err)
//     toast.error('Email exist Alre13ady !', {
//       position: toast.POSITION.TOP_RIGHT
//   });
//   })
  
//     }

   
    
const handlePrint = async () => {
    const input = document.getElementById('factureContent'); // ID de votre conteneur de facture
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
      pdf.save('facture.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
    
  const handleSubmite = () => {
    // Prevent the default submit and page reload
  
  

    // Handle validations
    axios
      .put(`http://localhost:3001/Chauff/updatefacture/${id}`
      ,{ headers: {
        'Content-Type': 'multipart/form-data',
      },})
     
      .then(response => {
     
        toast.success('Facture de chauffeur a été bien payé', {
          position: toast.POSITION.TOP_RIGHT
          
      });
  
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
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
             
                
                <h1 className="title">Facture</h1>
                <div className="item" id="factureContent">
                   <img
    src={chauffeur && chauffeur.photoAvatar}
    alt=""
                    className="itemImg"
                  /> 
                  <div className="details">
                    <h1 className="itemTitle">{chauffeur && chauffeur.Nom} {chauffeur && chauffeur.Prenom}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Nom:</span>
                      <span className="itemValue">{chauffeur && chauffeur.Nom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Nom D'utilisateur:</span>
                      <span className="itemValue">{chauffeur && chauffeur.username}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Prenom:</span>
                      <span className="itemValue">{chauffeur && chauffeur.Prenom}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">email:</span>
                      <span className="itemValue">
                      {chauffeur && chauffeur.email}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">DateNaissance:</span>
                      <span className="itemValue">{chauffeur && chauffeur.DateNaissance  }</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Genre:</span>
                      <span className="itemValue">{chauffeur && chauffeur.gender}</span>
                    </div>
                  
                    <div className="detailItem">
                      <span className="itemKey">Téléphone:</span>
                      <span className="itemValue">{chauffeur && chauffeur.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Adresse:</span>
                      <span className="itemValue">{chauffeur && chauffeur.address}</span>
                    </div>
        
                    <div className="detailItem">
                      <span className="itemKey">N° Permis:</span>
                      <span className="itemValue">{chauffeur && chauffeur.cnicNo}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Mois:</span>
                      <span className="itemValue">{facture && facture.Month }</span>
                    </div> <div className="detailItem">
                      <span className="itemKey">Montant Accumulé</span>
                      <span className="itemValue">{facture && facture.totalFareAmount}</span>
                    </div> <div className="detailItem">
                      <span className="itemKey">Nombre Trajet:</span>
                      <span className="itemValue">{facture && facture.nbretrajet}</span>
                    </div> <div className="detailItem">
                      <span className="itemKey">Montant Facture</span>
                      <span className="itemValue">{facture && facture.montantTva}</span>
                    </div> <div className="detailItem">
                      <span className="itemKey">N° Permis:</span>
                      <span className="itemValue">{chauffeur && chauffeur.cnicNo}</span>
                    </div>
                    
                    {role === 'Admin' || role === 'Agentad' ? (
          <div>
          
          <div className="activateButton" onClick={handlePrint}>
              Imprimer
             </div>
           
            {facture && facture.isPaid == false ? (
              <div className="activateButton" onClick={() => handleSubmite()} >
               Payer La Facture
              </div>
              
            ) : null}
          </div>
        ) : null}


    
           
                  </div>
                 
                </div>
              </div>
              
              <div className="right">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div>
            </div>
            <ToastContainer />
            
            
          </div>
        </div>
      );
}

export default SingleF