import React from 'react';
import "./listchauf.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import Datachauf from "../../components/datachauf/Datachauf"
const Listchauf = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datachauf/>
      </div>
    </div>
  )
}

export default Listchauf