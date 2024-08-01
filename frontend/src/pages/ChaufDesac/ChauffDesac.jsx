import "./chauffdesac.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DataChaufdesac from "../../components/dataChaufdesac/ChauffDesac"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataChaufdesac/>
       
      </div>
    </div>
  )
}

export default List