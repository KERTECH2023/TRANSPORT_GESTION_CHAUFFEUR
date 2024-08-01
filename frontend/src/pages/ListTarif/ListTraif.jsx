import React from 'react'
import "./listtraif.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DataTarif from "../../components/DataTarif/DataTarif"
const ListTraif = () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DataTarif/>
          </div>
        </div>
      )
}

export default ListTraif