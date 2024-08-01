export const ContactColumns = [
   
   
      {
          field: "Nom",
          headerName: "Nom",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
          
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
            field: "Email",
            headerName: "Email",
            width: 230,
          },
        
         
          {
            field: "Tel",
            headerName: "Téléphone",
            width: 100,
          },
      
        
     
    
      {
        field: "status",
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
      
  
      
];
    
   
    
    