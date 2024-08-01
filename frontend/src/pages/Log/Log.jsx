/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import './log.scss'

const Log = () => {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
  const [compteError, setCompteError] = useState("");
    const [role, setRole] = useState("");
    const [status, setSat] = useState("");
    const [userid, setUserid] = useState("");
  const navigate =useNavigate()
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post("http://localhost:3001/agent/loginAg", { email, password })
      .then(response => {
        const user = response.data
        setRole(user.role);
        setSat(user.stat);
        setUserid(user.id);
        console.log("role",user.role)
        window.localStorage.setItem('user',JSON.stringify(response))
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userNom", user.Nom);
        localStorage.setItem("userPrenom", user.Prenom);
        localStorage.setItem("userAvatar", user.photoAvatar);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userSat", user.stat);

        if (user.stat === false) {
          // Show the error message if the user status is false
          console.log("Votre compte est désactivé");
          setCompteError("Votre compte est désactivé");
          return; // Stop further execution if the status is false.
        }

        if (user.role === "Admin" || user.role === "Agent") {
          window.location.href = "/home";
        }
        else {
          window.location.href = "/home";
        }
        // window.location.reload();
        // console.log(response)
        
      
                    // Handle response
      })
     
      .catch(err =>{
        console.warn(err)
        if (err.response ) {
          if (err.response.status === 403) {
            setEmailError("l'email n'existe pas");
          } else {
            setEmailError("");
          }
          if (err.response.status === 406) {
            setPasswordError("Mot De Passe Incorrect");
          } else {
            setPasswordError("");
          }
          
        }
     
      })

    }









  return (
    <div>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Untitled</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>
    <div class="login-dark">
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
            <h2 class="sr-only">Login Form</h2>

            
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <strong>{compteError && <label className="eroor" >{compteError}</label>}</strong> <br></br> 
            <div class="form-group"><input class="form-control" type="email" onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" value={email
            } required />
            <strong>{emailError && <label className="eroor" >{emailError}</label>}</strong>
            </div>

            <div class="form-group"><input class="form-control" type="password" onChange={e => setPassword(e.target.value)}  name="password" placeholder="Mot de passe" value={password}
            required /> 
            <strong>{passwordError && <label className="eroor" >{passwordError}</label>}</strong>
             </div>
            <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div>
            
        
            <Link to={`/pass`} style={{ textDecoration: "none" }}>
                <div className="forgot">Vous avez oublié votre mot de passe ?</div>
                
              </Link>
            
            </form>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
</body>
    </div>
  )
}

export default Log