export const RecColumns = [
   
  {
    field: "N° Réclamation",
    headerName: "N° Réclamation",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.NumRec}`} 
        >
          {params.row.NumRec}
        </div>
      );
    },
  },

    {
        field: "Titre",
        headerName: "Titre",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
        
              {params.row.titre}
            </div>
          );
        },
      },
      
   
  
    {
      field: "Status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`} 
          >
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "Nom d'agent",
      headerName: "Nom d'agent",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.agentName}`} 
          >
            {params.row.agentName}
          </div>
        );
      },
    },
  ];
  
 
  ;
  