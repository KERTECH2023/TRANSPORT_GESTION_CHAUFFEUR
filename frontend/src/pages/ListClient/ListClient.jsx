import React from 'react'
import "./listclient.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DataClient from "../../components/dataClient/DataClient"
const ListClient = () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DataClient/>
          </div>
        </div>
      )
}

export default ListClient