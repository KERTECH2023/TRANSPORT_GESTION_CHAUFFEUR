export const InvoiceColumns = [
    {
        field: "Nom Chauffeur",
        headerName: "Nom Chauffeur",
        width: 160,
        renderCell: (params) => {
            // Convert the Buffer to a base64 string
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.photoAvatar} alt="avatar" />
                {params.row.chauffeurName}
              </div>
            );
        
            // Fallback if photoAvatar is not a Buffer or not available
           
        },
      },
    
      {
        field: "EmailChauffeur",
        headerName: "Email ",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.chauffeurEmail}`}>
              {params.row.chauffeurEmail}
            </div>
          );
        },
      },
      {
        field: "NumTelChauffeur",
        headerName: "Num Tel Chauffeur",
        width: 160,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.chauffeurPhone}`}>
              {params.row.chauffeurPhone}
            </div>
          );
        },
      },
  {
    field: "Montant",
    headerName: "Montant accumulé",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.totalFareAmount}`}>
          {params.row.totalFareAmount.toFixed(1)}
        </div>
      );
    },
  },
  {
    field: "Trajets",
    headerName: "Trajets",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.nbretrajet}`}>
          {params.row.nbretrajet}
        </div>
      );
    },
  },
  {
    field: "Facture",
    headerName: "Facture",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.montantTva}`}>
          {params.row.montantTva.toFixed(1)}
        </div>
      );
    },
  },
  {
    field: "Payé",
    headerName: "Payé",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isPaid + ''}`}>
          {params.row.isPaid + ''}
        </div>
      );
    },
  },
  
];
