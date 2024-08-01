/* eslint-disable no-unused-vars */
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Buffer } from 'buffer';

const List = () => {



  const [user , setUser] = useState()

  const navigate =useNavigate()
  const [clickedImage, setClickedImage] = useState(null);
const [isImageOpen, setIsImageOpen] = useState(false);

  const {id} = useParams();
  const role = window.localStorage.getItem("userRole");
  console.log("role//",role)
  
  useEffect(() =>{
  if (id) {
    getSingleUser(id)
  }
  
  },[id] )
  console.log("useriddd", id);
  
  const getSingleUser = async (id)  => {
    const response = await axios.get(`http://localhost:3001/Chauff/searchchauf/${id}`);
    if(response.status===200){
   setUser({ ...response.data })
   console.log("data" , response.data)
    }
  }
   console.log("USER**" , user)

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
            <TableCell className="tableCell">Carte Identité</TableCell>
            <TableCell className="tableCell">Permis Recto</TableCell>
            <TableCell className="tableCell">Permi Verso</TableCell>
            <TableCell className="tableCell">Carte VTC</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow key={user && user.id}>
          
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={user && user.photoCin}
     alt="" className="image"  onClick={() => handleImageClick(user && user.photoCin)}/>
                  {isImageOpen && clickedImage ===user &&  user.photoCin && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.photoCin}
     alt="" className="fullImage" />
      </div>
    )}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={user && user.photoPermisRec}
     alt="" className="image" onClick={() => handleImageClick(user && user.photoPermisRec)} />
                

                  {isImageOpen && clickedImage === user && user.photoPermisRec && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.photoPermisRec}
     alt="" className="fullImage" />
      </div>
    )}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper"> 
                  <img src={user && user.photoPermisVer}
     alt="" className="image" onClick={() => handleImageClick(user && user.photoPermisVer)} />
                 

                  {isImageOpen && clickedImage === user && user.photoPermisVer && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.photoPermisVer}
     alt="" className="fullImage" />
      </div>
    )}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={user && user.photoVtc}
     alt="" className="image"  onClick={() => handleImageClick(user && user.photoVtc)}/>
                 

                  {isImageOpen && clickedImage ===user &&  user.photoVtc && (
      <div className="imageOverlay">
        <span className="close" onClick={handleCloseImage}>
          &times;
        </span>
        <img src={user && user.photoVtc}
     alt="" className="fullImage" />
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

export default List;
