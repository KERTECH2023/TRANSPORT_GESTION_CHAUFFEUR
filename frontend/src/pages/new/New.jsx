import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';




const New = () => {
  const [Nom, setNom] = useState()
  const [Prenom, setPrenom] = useState()
  const [email, setemail] = useState()
  const [phone, setphone] = useState()
  const [photoAvatar, setphotoAvatar] = useState({file :[]})
  
  const [gender, setgender] = useState()
  const [role, setrole] = useState()
  const [DateNaissance, setDateNaissance] = useState()
  const [Nationalite, setNationalite] = useState()
const navigate =useNavigate()

const handleSubmit = e => {
  // Prevent the default submit and page reload
  e.preventDefault()

const data = new FormData();

data.append('photo',photoAvatar[0])

console.log("fileeeeee",data)


const phoneRegex = /^[0-9]{8}$/;
  if (!phoneRegex.test(phone)) {
    toast.error('Le numéro de téléphone doit comporter 8 chiffres.', {
      position: toast.POSITION.TOP_RIGHT
    });
    return;
  }

 
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(Nom)) {
      toast.error('Le nom ne doit contenir que des lettres et des espaces.', {
        position: toast.POSITION.TOP_RIGHT
      });
      return ;
    }
    const prenomRegex = /^[a-zA-Z\s]+$/;
    if (!prenomRegex.test(Prenom)) {
      toast.error('Le Prenom ne doit contenir que des lettres et des espaces.', {
        position: toast.POSITION.TOP_RIGHT
      });
      return ;
    }

  // Handle validations
  axios
    .post("http://localhost:3001/agent/AjoutAg", { Nom, Prenom, email, phone,photoAvatar,gender , role ,DateNaissance ,Nationalite}
    ,{ headers: {
      'Content-Type': 'multipart/form-data',
    },})
   
    .then(response => {
      console.log("res",Nom)
      console.log("fileeee*//**e",photoAvatar)
      toast.success('Agent Added with Success !', {
        position: toast.POSITION.TOP_RIGHT
        
    });
    console.log("file",response.data)
      //navigate("/users")
      setTimeout(()=>navigate("/users"),5000);
      console.log(response)

      
    
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
          <h1>Add New Client</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form action="" id="login" method="post" onSubmit={handleSubmit} >
            <p className="item">
            <label>Nom :</label><br />
            <input type="text" onChange={e => setNom(e.target.value)} name="Firstname" className='InputBox' id="Firstname" value={Nom || ""
            } required />
        </p>

        <p className="item">
            <label>Prenom :</label><br />
            <input type="text" onChange={e => setPrenom(e.target.value)} name="Lastname" className='InputBox' id="Lastname" value={Prenom || ""
            } required />
        </p>
        
        <p className="item">
            <label>Email :</label><br />
            <input type="email" onChange={e => setemail(e.target.value)} name="email" className='InputBox' id="email" value={email || ""
            } required />
        </p>

        <p className="item">
            <label>Phone :</label><br />
            <input type="text" onChange={e => setphone(e.target.value)} name="phone" className='InputBox' id="phone" value={phone || ""
            } required />
        </p>
        <p className="item">
            <label>DateNaissance :</label><br />
            <input type="Date" onChange={e => setDateNaissance(e.target.value)} name="DateNaissance" className='InputBox' id="DateNaissance" value={DateNaissance || ""
            } required />
        </p>
<p className="item">
<label>Gender :</label><br />
        <select onChange={e => setgender(e.target.value)} value={gender || ""} >
        <option value="-">-</option>
    		<option value="male">male</option>
    		<option value="female">female</option>
    		
    		
   		</select>
       </p>

       <p className="item">
<label>Role :</label><br />
        <select onChange={e => setrole(e.target.value)} value={role || ""} >
        <option value="-">-</option>
    		<option value="comptabilité">comptabilité</option>
    		<option value="ressources_humaines">ressources_humaines</option>
        <option value="communication">communication</option>
        <option value="service_juridique">service_juridique</option>
    		
    		
   		</select>
       </p>

       <p className="item">
<label>Nationalite :</label><br />
        <select onChange={e => setNationalite(e.target.value)} value={Nationalite || ""} >
        <option value="-">-</option>
    		<option value="Tunisian">Tunisian</option>
    		<option value="Francais">Francais</option>
        <option value="marocain">marocain</option>
    		
    		
   		</select>
       </p>

        <p className="item">
            <label>photo de profil  :</label><br />
            <input type="file"  onChange={e => setphotoAvatar(e.target.files[0])} name="photo" className='InputBox' id="photo" required />
            
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
};

export default New;
