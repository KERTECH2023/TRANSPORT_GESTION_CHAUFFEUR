import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { InvoiceColumns } from "../../DataTableInvoice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const DataFact = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3001/Chauff/factures");
    console.log(response)
    if (response.status === 200) {
      const factures = response.data;
      const enhancedFactures = await Promise.all(factures.map(async (facture) => {
        const chauffeurResponse = await axios.get(`http://localhost:3001/Chauff/searchchauf/${facture.chauffeur}`);
        if (chauffeurResponse.status === 200) {
          const chauffeurData = chauffeurResponse.data;
          return {
            ...facture,
            chauffeurName: chauffeurData.Nom,
            chauffeurEmail: chauffeurData.email,
            chauffeurPhone: chauffeurData.phone,
            photoAvatar:chauffeurData.photoAvatar
          };
        }
        return facture;
      }));
      setData(enhancedFactures);
    }
  };

  const handleSearchTerm = (e) => {
    setSearch(e.target.value);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        const role = window.localStorage.getItem("userRole");
        return (
          <div className="cellAction">
            {(role === "Admin" || role === "Agentad") && (
              <>
                <Link to={`/consultF/${params.row._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="viewButton">Consulté</div>
                </Link>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Listes Des Facture
        <Link to="/Chauffeur/new" className="link"></Link>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchTerm}
          name="Search"
          id="Search"
          className="find"
        />
        <SearchOutlinedIcon />
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={InvoiceColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
      <ToastContainer />
    </div>
  );
};

export default DataFact;
