import React from 'react'
import "./listrec.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DataRec from "../../components/DataRec/DataRec"
const ListClient = () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DataRec/>
          </div>
        </div>
      )
}

export default ListClient