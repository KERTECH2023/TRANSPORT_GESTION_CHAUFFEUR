import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotAccessibleIcon from '@mui/icons-material/NotAccessible';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const role = window.localStorage.getItem("userRole");
  const sat = window.localStorage.getItem("userSat");
  console.log("role",role)
  console.log("rohiiile",sat)


  const navigate =useNavigate()
  const logout=()=>{
    localStorage.clear();
    navigate("/login")
}
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">TunisieUber Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/home">
            <DashboardIcon className="icon" />
            <span>Tableau de bord</span>
            </Link>
          </li>
          

          <p className="title">LISTS</p>
          {/* {role === "Agentad" && ( */}
     {(role === "Admin" || role === "Agentad") && (
          <Link to="/users" style={{ textDecoration: "none",color: "inherit" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Agents</span>
            </li>
          </Link>
          )}

          <Link to="/Chauffeur" style={{ textDecoration: "none" }}>
            <li>
              <AirlineSeatReclineNormalIcon className="icon" />
              <span>Chauffeur</span>
            </li>
          </Link>
          <Link to="/Client" style={{ textDecoration: "none" }}>
            <li>
              <AccessibilityIcon className="icon" />
              <span>Client</span>
            </li>
          </Link>
         
          <Link to="/Tarif" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Tarifs</span>
          </li>
          </Link>

          <p className="title">LISTS DES COMPTES Désactivé</p>
          {(role === "Admin" || role === "Agentad") && (
          <Link to="/AgentDesactivé"  style={{ textDecoration: "none",color: "inherit" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>Agents</span>
            </li>
          </Link>
           )}

          <Link to="/ChauffeurDesactivé" style={{ textDecoration: "none" }}>
            <li>
              <CarCrashIcon className="icon" />
              <span>Chauffeur</span>
            </li>
          </Link>
          <Link to="/ClientDesactivé" style={{ textDecoration: "none" }}>
            <li>
              <NotAccessibleIcon className="icon" />
              <span>Client</span>
            </li>
          </Link>

          
          <p className="title">Reclamation</p>
         
          <Link to="/Rec" style={{ textDecoration: "none" }}>
            <li>
              <NotificationImportantIcon className="icon" />
              <span >Réclamation a traité</span>
            </li>
          </Link>
          <Link to="/Contact" style={{ textDecoration: "none" }}>
            <li>
              <PermContactCalendarIcon className="icon" />
              <span >Contact-Nous</span>
            </li>
          </Link>
          {!(role === "Admin" || role === "Agentad") && (
  <Link to="/Rec/NewRec" style={{ textDecoration: "none", color: "inherit" }}>
    <li>
      <NotificationAddIcon className="icon" />
      <span >Envoyé Une Réclamation</span>
    </li>
  </Link>
)}

          
        
        



          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <Link to="/ConsultNewchauf" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          </Link>
          <Link to="/ConsultInvoices" style={{ textDecoration: "none" }}>
          <li>
            <CreditScoreIcon className="icon" />
            <span>Facturation</span>
          </li>
          </Link>
          
          <p className="title">USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
