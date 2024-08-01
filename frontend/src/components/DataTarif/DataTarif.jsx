/* eslint-disable no-unused-vars */
import "./datatarif.scss"
import { DataGrid } from "@mui/x-data-grid";
import { TarifColumns } from "../../datatarif";
import { Link } from "react-router-dom";
import {React, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "react-toastify/dist/ReactToastify.css";

const DataTarif = () => {

    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const role = window.localStorage.getItem("userRole");
    console.log("role**",role)
   
    useEffect(()=>{
      getUsers();
    },[]);
    const getUsers = async () =>{
      const response = await axios.get("http://localhost:3001/Tar/show");
      if(response.status===200){
        setData(response.data)
      }
    };
    console.log("data=>",data)

    const handleSearchTerm = (e) =>{
        console.log(e.target.value)
        let value = e.target.value;
        setsearch(value)
  
      };
      console.log(search)

     
      return (
        <div className="datatable">
      
  
          <div className="search">
            <input type="text" placeholder="Search..." onChange={handleSearchTerm}  name="Search"
          id="Search" />
            <SearchOutlinedIcon />
          </div>
          <DataGrid
            className="datagrid"
            rows={data.filter((val => {
              return val.tarif.includes(search)
            }))}
            columns={TarifColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
          <ToastContainer />
        </div>
      );
}

export default DataTarif