import React from 'react'
import'./listnewchauf.scss'

import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DataNewChauf from '../../components/DataNewChauf/DataNewChauf'

const ListNewChauf = () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            <DataNewChauf/>
          </div>
        </div>
      )
}

export default ListNewChauf