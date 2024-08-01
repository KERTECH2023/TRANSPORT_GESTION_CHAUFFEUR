/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./datacontact.scss";
import { DataGrid } from "@mui/x-data-grid";
import {ContactColumns} from "../../datacontact"
import { Link } from "react-router-dom";
import {React, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const DataContact = () => {
    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const role = window.localStorage.getItem("userRole");
    console.log("role",role)
    const userid = window.localStorage.getItem("userId");
    console.log("id",userid)
  
  
    useEffect(() => {
    
        getcontact();
      
    }, [role]);
    
    const getcontact = async () =>{
      const response = await axios.get("http://localhost:3001/Con/show");
      if(response.status===200){
        setData(response.data)
        console.log("dataaa",response.data)
      }
    };
 
    console.log("data=>",data)
  
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
              <Link to={`/ConsultCon/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Consulté</div>
              </Link>
              {/* <div>
              {(role === "Admin" || role === "Agentad") && (
              <Link to={`/updateClient/${params.row.id}`} style={{ textDecoration: "none",color: "inherit" }}>
                  <div className="upButton">Mettre a jour </div>
                </Link>
  )}
              </div> */}
           
  
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
        
  
        <div className="search">
            <input type="text" placeholder="Search..." onChange={handleSearchTerm}  name="Search"
          id="Search" className="find"/>
            <SearchOutlinedIcon />
          </div>
        <DataGrid
          className="datagrid"
          rows={data.filter((val) => {
              const searchTerm = search.toLowerCase();
              const Nom = val.Nom.toLowerCase();
              const Tel = val.Tel.toLowerCase();
              const Email = val.Email.toLowerCase();
              
              return Nom.includes(searchTerm) || 
              Tel.includes(searchTerm) ||
                     Email.includes(searchTerm);
            })
            .sort((a, b) => {
              if (a.status === "terminé" && b.status !== "terminé") {
                return 1;
              }
              if (b.status === "terminé" && a.status !== "terminé") {
                return -1;
              }
              return 0;
            })
          }
          columns={ContactColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
        <ToastContainer />
      </div>
    );
}

export default DataContact