import "./tablevoi.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const ListVoi = () => {



  const [user , setUser] = useState()


  const [clickedImage, setClickedImage] = useState(null);
const [isImageOpen, setIsImageOpen] = useState(false);

  const {id} = useParams();
  const role = window.localStorage.getItem("userRole");
  console.log("role//",role)
  
  useEffect(() =>{
  if (id) {
    getSingleUservoi(id)
  }
  
  },[id] )
  console.log("useridvoit2", id);
  
  const getSingleUservoi = async (id)  => {
    const response = await axios.get(`http://localhost:3001/Voi/getvoi/${id}`);
    if(response.status===200){
   setUser({ ...response.data })
   console.log("dataVoiture2" , response.data)
    }
  }
 
  console.log("USER**2" , user)

  const handleImageClick = (image) => {
    setClickedImage(image);
    setIsImageOpen(true);
  };
  
  const handleCloseImage = () => {
    setClickedImage(null);
    setIsImageOpen(false);
  };
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Modelle</TableCell>
            <TableCell className="tableCell">Matriculation</TableCell>
            <TableCell className="tableCell">Carte Grise</TableCell>
            <TableCell className="tableCell">Assurance</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow key={user && user.id}>
          
            <TableCell className="tableCell">{user && user.modelle}</TableCell>

            
              <TableCell className="tableCell">{user && user.immatriculation}</TableCell>


              <TableCell className="tableCell">
  <div className="cellWrapper">
    {user && user.cartegrise ? (
      <img
      src={user && user.cartegrise}
        alt=""
        className="image"
        onClick={() => handleImageClick(user.cartegrise)}
      />
    ) : (
      // eslint-disable-next-line no-undef
      <img src={user && user.cartegrise}alt="" className="image" /> // Replace placeholderImage with the source of your placeholder image
    )}

    {isImageOpen && clickedImage === user.cartegrise && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.cartegrise} alt="" className="fullImage" />
      </div>
    )}
  </div>
</TableCell>

<TableCell className="tableCell">
  <div className="cellWrapper">
    {user && user.assurance ? (
      <img
      src={user && user.assurance}
        alt=""
        className="image"
        onClick={() => handleImageClick(user.assurance)}
      />
    ) : (
      
      <img src={user && user.photoAssurance} alt="" className="image" /> 
    )}

    {isImageOpen && clickedImage === user.assurance && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.assurance} alt="" className="fullImage" />
      </div>
    )}
  </div>
</TableCell>

              {/* <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
      
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListVoi;
