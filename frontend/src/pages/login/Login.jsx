/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

import "./login.scss"


const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState("");
  const [userid, setUserid] = useState("");
const navigate =useNavigate()
const isLoggedIn = window.localStorage.getItem("isLoggedIn")

  //const history = useHistory();

  const handleSubmit = e => {
      // Prevent the default submit and page reload
      e.preventDefault()
  
      // Handle validations
      axios
        .post("http://localhost:3001/api/login", { email, password })
        .then(response => {
          const user = response.data
          setRole(user.role);
          setUserid(user.id);
          console.log("role",user.role)
          window.localStorage.setItem('user',JSON.stringify(response))
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userNom", user.Nom);
          localStorage.setItem("userPrenom", user.Prenom);
          localStorage.setItem("userAvatar", user.photoAvatar);
          localStorage.setItem("userId", user.id);
          if (user.role === "Admin") {
            navigate("/home");
          } else if (user.role === "Agent") {
            navigate("/home");
          }
          else {
            navigate("/home");
          }
          window.location.reload();
          console.log(response)
          
        
                      // Handle response
        })
       
    .catch(err =>{
      console.warn(err)
      alert("Please verify your information")
    })

      }
  return (
    <div className=" login">
    <h2>Sign in to us</h2>
    <form action="" id="login" method="post" onSubmit={handleSubmit} >
    <p className="item">
            <label>Username or email address</label><br />
            <input type="email" onChange={e => setEmail(e.target.value)} name="email" className='InputBox' id="email" value={email
            } required />
        </p>
        <p className="item">
            <label>Password</label>
<br></br>
           
            <input  type="password" onChange={e => setPassword(e.target.value)}  name="password" value={password} id="password" required />
        </p>
        <p className="item">
            <button id="sub_btn" type="submit" value="login">Login</button>
          
        </p>
    </form>
    <footer>
    <Link to={`/pass`} style={{ textDecoration: "none" }}>
                <div className="forgot">Vous avez oublié votre mot de passe ?</div>
                
              </Link>
      
        <p>First time? <Link to="/register">Create an account</Link>.</p>
        <p><Link to="/">Back to Homepage</Link>.</p>
    </footer>
</div>
  )
}

export default Login