import "./ClientDesa"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataClientDesa from  "../../components/dataCLientDesac/DataClientDesa"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataClientDesa/>
       
      </div>
    </div>
  )
}

export default List