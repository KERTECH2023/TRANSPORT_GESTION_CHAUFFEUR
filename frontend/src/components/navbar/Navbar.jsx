import "./navbar.scss";


import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const photo = window.localStorage.getItem("userAvatar");
  const Nom = window.localStorage.getItem("userNom");
  const Prenom = window.localStorage.getItem("userPrenom");
  const role = window.localStorage.getItem("userRole");
  const goBack = () => {
    if (location.pathname !== "/home") {
      navigate(-1);
      const arrowIcon = document.querySelector(".back-icon");
      arrowIcon.classList.add("clicked");
    }
  };
  return (
    <div className="navbar">
      <div className="arrow-container"> {/* Wrap the arrow icon in a container */}
          <ArrowBackOutlinedIcon className="back-icon" onClick={goBack} />
        </div>
      <div className="wrapper">

      <img
                    src={photo}
                    alt=""
                    className="itemImg"
                  />
         
         

                  
<h1 className="itemTitle">{Nom} {Prenom}</h1>


<span className="itemValue">{role}</span>


        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items">
         
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
         
          
          
          
      
        </div>

      </div>
      
    </div>
    
  );
};

export default Navbar;
