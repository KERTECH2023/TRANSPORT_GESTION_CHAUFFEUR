/* eslint-disable no-unused-vars */
import "./adentdesac.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import {React, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Datatable = () => {


  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");


  useEffect(()=>{
    getUsers();
  },[]);
  const getUsers = async () =>{
    const response = await axios.get("http://localhost:3001/agent/getAgdes");
    if(response.status===200){
      setData(response.data)
    }
  };
  console.log("data=>",data)
  // const handleDelete = async (id) => {
  //   if(window.confirm("Are you sure that you wanted to delete this client")
  //   ){
  //     const response = await axios.delete(`http://localhost:3001/agent/destroyAg/${id}`);
  //     if(response.status===200){
  //       toast.success('Agent Deleted with Success !', {
  //         position: toast.POSITION.TOP_RIGHT
  //     });
  //     getUsers();
  //     }
  //   }
  // };
  const handleSearchTerm = (e) =>{
    console.log(e.target.value)
    let value = e.target.value;
    setsearch(value)

  };
  console.log(search)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/Consultsast/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Consulté</div>
            </Link>
          <div>
            
          <Link to={`/update/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="upButton">Mettre a jour </div>
            </Link>
          </div>
         

            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Liste Des Agents Désactivé
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>

      <div className="search">
          <input type="text" placeholder="Search..." onChange={handleSearchTerm}  name="Search"
        id="Search" className="find"/>
          <SearchOutlinedIcon />
        </div>
      <DataGrid
        className="datagrid"
        rows={data.filter((val) => {
          const searchTerm = search.toLowerCase();
          const chauffName = val.Nom.toLowerCase();
          const chauffprenom = val.Prenom.toLowerCase();
          const chauffphone = val.phone.toLowerCase();
          
          return chauffName.includes(searchTerm) || 
          chauffprenom.includes(searchTerm) ||
          chauffphone.includes(searchTerm);
        })}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ToastContainer />
    </div>
  );
};

export default Datatable;
