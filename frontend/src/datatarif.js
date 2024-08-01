export const TarifColumns = [


    {
        field: "Tarif du jour",
        headerName: "Tarif du jour",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
         {/* <img className="cellImg" src={params.row.photoAvatar} alt="avatar" /> */}
              {params.row.tarif}
             Dt </div>
          );
        },
      },
    {
      field: "Tarif aprés majoration",
      headerName: "Tarif aprés majoration",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.tarifmaj} Dt
          </div>
        );
      },
    },
  
    

  ];
  
  //temporary data
  ;
  