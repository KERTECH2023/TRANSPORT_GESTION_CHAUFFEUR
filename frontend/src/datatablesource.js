export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Nom",
    headerName: "Nom",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
     <img className="cellImg" src={params.row.photoAvatar} alt="avatar" />
          {params.row.Nom}
        </div>
      );
    },
  },
  {
    field: "Prenom",
    headerName: "Prenom",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
     
          {params.row.Prenom}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

 
  {
    field: "phone",
    headerName: "Téléphone",
    width: 100,
  },
  {
    field: "role",
    headerName: "Rôle",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`} 
        >
          {params.row.role}
        </div>
      );
    },
  },
];

//temporary data
;
