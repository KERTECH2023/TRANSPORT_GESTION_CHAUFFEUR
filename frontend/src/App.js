/* eslint-disable no-unused-vars */
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Listchauf from "./pages/listchauf/Listchauf"
import ListClient from "./pages/ListClient/ListClient";
import ListTraif from "./pages/ListTarif/ListTraif";
import Single from "./pages/single/Single";
import SingleC from "./pages/singlechauf/SingleC";
import SingleF from "./pages/SingleFact/SingleFacture";

import New from "./pages/new/New";
import NewCh from "./pages/NewChauf/NewCh";
import NewClient from "./pages/NewClient/NewClient";
import UpdCl from "./pages/updClient/UpdCl"
import UpdChauf from "./pages/UpdChauf/UpdChauf" 
import FacturesPage from "./pages/Facture/Facture"
import Landingpage from "./pages/landingpage/landingpage"
import AgnetDesac from "./pages/AgentDesac/AgentDesac"
import ChauffDesac from "./pages/ChaufDesac/ChauffDesac"
import ClientDesa from "./pages/ClientDesa/ClientDesa"
import UpdateStat from "./pages/UpdateStatus/UpdateStat"
import SingleClient from "./pages/SingleClient/SingleClient";
import UpdClientcl from "./pages/UpdClient_cl/UpdClient"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListReclamation from "./pages/ListReclamation/ListRec"
import SingleRecla from "./pages/SingleRecla/SingleRecla"
import NewRec from "./pages/NewRec/NewRec";
import ListNewChauf from "./pages/ListNewChauf/ListNewChauf";
import Log from "./pages/Log/Log";
import Passwordforget from "./pages/Fpassword/Passwordforget";
import Profile from "./pages/Profile/Profile";
import ListContact from "./pages/ListContact/ListContact"
import SingleCon from "./pages/SingleContact/SingleCon";
import ListFacture from "./pages/Facture/Facture";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";




function App() {
  const { darkMode } = useContext(DarkModeContext);

  const isLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";
  console.log(isLoggedIn,"login")
  

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home/> : <Landingpage/>} />
            {/* <Route index element={<Landingpage />} /> */}
            <Route path="/login" element={<Login />} /> 
            <Route path="/log" element={<Log />} />
            <Route path="/pass" element={<Passwordforget />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Landingpage/>} />
            <Route path="cosnult/:id" element={ isLoggedIn ? <Single /> : <Landingpage/>} />
            <Route path="cosnultC/:id" element={isLoggedIn ? <SingleC /> : <Landingpage/>} />
            <Route path="consultF/:id" element={isLoggedIn ? <SingleF /> : <Landingpage/>} />

            <Route path="facture/:id" element={isLoggedIn ? <FacturesPage /> : <Landingpage/>} />
            <Route path="update/:id" element={isLoggedIn ? <UpdCl /> : <Landingpage/>} />
            <Route path="updateCh/:id" element={isLoggedIn ? <UpdChauf />: <Landingpage/>} />
            <Route path="updateClient/:id" element={isLoggedIn ? <UpdClientcl /> : <Landingpage/>} />
            <Route path="Consultsast/:id" element={isLoggedIn ? <UpdateStat /> : <Landingpage/>} />
            <Route path="ConsultCL/:id" element={isLoggedIn ? <SingleClient /> : <Landingpage/>} />
            <Route path="ConsultRec/:id" element={isLoggedIn ? <SingleRecla /> : <Landingpage/>} />
            <Route path="ConsultCon/:id" element={isLoggedIn ? <SingleCon /> : <Landingpage/>} />
            <Route path="ConsultNewchauf" element={isLoggedIn ? <ListNewChauf /> : <Landingpage/>} />
            <Route path="/profile" element={<Profile />} />

            <Route path="users">
              <Route index element={isLoggedIn ? <List /> : <Landingpage/>} />
              <Route
                path="new"
                element={ isLoggedIn ?<New  title="Ajouté Nouveau User" /> : <Landingpage/>}
              />
            </Route>

            <Route path="ConsultInvoices">
              <Route index element={ isLoggedIn ? <ListFacture /> : <Landingpage/>} />

             
            </Route>

            <Route path="Chauffeur">
              <Route index element={ isLoggedIn ? <Listchauf /> : <Landingpage/>} />
             
              <Route
                path="new"
                element={ isLoggedIn ?<NewCh  title="Ajouté Nouveau Chauffeur" /> : <Landingpage/>}
              />
            </Route>
            <Route path="Client">
              <Route index element={isLoggedIn ?<ListClient /> : <Landingpage/>} />
             
              <Route
                path="newCL"
                element={ isLoggedIn ?<NewClient  title="Ajouté Nouveau Client" /> : <Landingpage/>}
              />
            </Route>
            <Route path="Tarif">
              <Route index element={isLoggedIn ?<ListTraif /> : <Landingpage/>} />
             
            </Route>

            <Route path="Rec">
              <Route index element={isLoggedIn ? <ListReclamation /> : <Landingpage/>} />
              <Route
                path="NewRec"
                element={ isLoggedIn ?<NewRec  title="Ajouté Nouveau Reclamation" /> : <Landingpage/>}
              />
            </Route>

            <Route path="Contact">
              <Route index element={isLoggedIn ? <ListContact/> : <Landingpage/>} />
            </Route>

            <Route path="AgentDesactivé">
              <Route index element={ isLoggedIn ?<AgnetDesac /> : <Landingpage/>} />
            </Route>
            <Route path="ChauffeurDesactivé">
              <Route index element={isLoggedIn ? <ChauffDesac /> : <Landingpage/>} />
            </Route>
            <Route path="ClientDesactivé">
              <Route index element={isLoggedIn ? <ClientDesa/> : <Landingpage/>} />
            </Route>

         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
