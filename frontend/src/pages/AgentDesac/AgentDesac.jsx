import "./agentdesac.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AgentDesac from "../../components/dataAgentdesac/AgentDesac"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AgentDesac/>
       
      </div>
    </div>
  )
}

export default List