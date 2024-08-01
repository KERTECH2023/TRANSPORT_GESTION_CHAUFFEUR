/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

import './passwordforget.scss'

const Passwordforget = () => {
    const [submitStatus, setSubmitStatus] = useState("");
	const [email, setemail] = useState()
	const [emailError, setEmailError] = useState("");
    const navigate =useNavigate()

	const handleSubmit = e => {
		// Prevent the default submit and page reload
		e.preventDefault()
	
	
	  
	 
	
	
	
		// Handle validations
		axios
		  .post("http://localhost:3001/agent/reset", {email})
		
		 
		  .then(response => {
			const newUser = response.data.uses
			
			setSubmitStatus("Un Email a été Envoye ");
			
			setemail("");
			setEmailError("");
		
			
			//navigate("/users")
			setTimeout(() => {
			  setSubmitStatus("");
              navigate("/log");
			  
			}, 3000);
	  
		 
		  
						// Handle response
		  })
		 
	  .catch(err =>{
		console.warn(err)
		if (err.response ) {
		  if (err.response.status === 404) {
			setEmailError("l'email n'existe pas");
		  } else {
			setEmailError("");
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
                <h2 class="sr-only">Mot De Passe Oublié ?</h2>
                {submitStatus && (
        						<div className="flex justify-center items-center mt-4">
          						<p className="reset">
            					{submitStatus}
          						</p>
        						</div>
      							)}
                
                <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
               
                <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email" onChange={e => setemail(e.target.value)}  value={email || ""}  required  />
            
                <strong>{emailError && <label className="eroor" >{emailError}</label>}</strong>
                </div>
                <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Envoyé</button></div>
              </form>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </body>
        </div>
  )
}

export default Passwordforget