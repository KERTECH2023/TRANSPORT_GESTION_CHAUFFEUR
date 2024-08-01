import React from 'react'

import "./listcontact.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataContact from "../../components/DataContact/DataContact"
const ListContact = () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DataContact/>
          </div>
        </div>
      )
}

export default ListContact