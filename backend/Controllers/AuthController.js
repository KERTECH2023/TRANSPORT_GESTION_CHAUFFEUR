const Use   = require('../Models/Admin')
const bcrypt  =require('bcryptjs')
const config = require("../config.json");
const jwt    =require('jsonwebtoken')
const nodemailer = require('nodemailer');

/**--------------------Ajouter un agnet------------------------  */

const register = async (req, res) => {
    const { Firstname , Lastname, email, phone} = req.body;
    console.log(
      req.body.Firstname
  )
  console.log(
    req.body.Lastname
)
  console.log(
  req.body.email
  )
  console.log(
  req.body.phone
  )
  console.log(
    req.file
    )
 
const {firebaseUrl} =req.file ? req.file : "";
  
  
    const verifUtilisateur = await Use.findOne({ email });
    if (verifUtilisateur) {
      res.status(403).send({ message: "Utilisateur existe deja !" });
    } else {
      const nouveauUtilisateur = new Use();

  
      mdpEncrypted = bcrypt.hashSync(phone,10);

      
      nouveauUtilisateur.Firstname = Firstname;
      nouveauUtilisateur.Lastname = Lastname;
      nouveauUtilisateur.email = email;
      nouveauUtilisateur.phone = phone;
      nouveauUtilisateur.password = mdpEncrypted; 
      nouveauUtilisateur.photo = firebaseUrl;
     
      console.log (
        nouveauUtilisateur
    )
    
      nouveauUtilisateur.save();
  
      console.log(
        mdpEncrypted
      )
      // token creation
      const token = jwt.sign({ _id: nouveauUtilisateur._id }, config.token_secret, {
        expiresIn: "120000", // in Milliseconds (3600000 = 1 hour)
      });
  
      sendConfirmationEmail(email);
      res.status(201).send({ message: "success", uses: nouveauUtilisateur, "Token": jwt.verify(token, config.token_secret) });
    }
  };

  async function sendConfirmationEmail(Email) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mahdikaroui383@gmail.com', // Replace with your email
        pass: 'doyr zflv xvcu rumh', // Replace with your email password
    
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  

  
    const mailOptions = {
      from: 'Transport_APP<mahdikaroui383@gmail.com>',
      to: Email,
      subject: 'Transport_APP Account For admin ',
      html: '<h3>Your Transport_APP Account Has been created. \n Email : ' +Email+ '\n Password : Your Phone Number.</h3>'
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  

/**--------------Login Admin-------------------- */
  
  const login = (req, res) => {


    console.log(
      req.body.email
    )
  
    console.log(
      req.body.password
    )
  
  
  
  
    var email = req.body.email
    var password = req.body.password
    Use.findOne({ email: email }, function (err, user) {
  
      if (err) {
        console.log(err);
      }
  
  
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err
            })
          }
  
          if (result) {
            let token = jwt.sign({ Firstname: user.Firstname }, 'verysecretValue', { expiresIn: '1h' })
           
            
            return res.json({
  
              Firstname: user.Firstname,
              Lastname: user.Lastname,
              email: user.email,
              phone: user.phone,
              password: user.password,
         
              token
  
  
  
  
            })
            
            
          } else {
            res.status(403).send({ message: "password does not matched !" });
  
          }
        })
  
  
      } else {
        res.status(403).send({ message: "Wrong email adress!" });
  
  
  
  
  
      }

      
    })

  
  }

  /**----------Update Agent----------------- */
  const update = (req, res, next)=>{
    const {id} = req.params
    const {firebaseUrl} =req.file ? req.file : "";
    let updateData ={

  
        Firstname : req.body.Firstname,
        Lastname : req.body.Lastname,
        email : req.body.email,
        phone : req.body.phone,
        photo : firebaseUrl,
    
    }
    console.log(updateData)

    Use.findByIdAndUpdate(id , {$set :  updateData})
    .then (() =>{
        res.json({
            message : ' user update with succes !'
        })

    })
.catch(error =>{
    res.json({
        message : 'error with updtaing user !'
    })
})

}

  const updateuse = async (req,res, next) => {
    const {id} = req.params
    const {firebaseUrl} =req.file ? req.file : "";

     try{
    const adminUpdated = await Use.findByIdAndUpdate(id,{$set:{ Firstname : req.body.Firstname, photo:firebaseUrl}})
    console.log(adminUpdated)
    console.log(adminUpdated)
    return res.status(200).send({
        message: "Admin was updated successfully!"
      })
    }catch(error){
        return res.status(500).send({err:error})
    }
   
    }


/**-----------Cherche sur un agent ------------- */


   const  searchuse = async(req,res) => {
        const id = req.params.id;
        Use.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "Admin introuvable pour id " + id });
            else res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Erreur recuperation Admin avec id=" + id });
          });
      }


  const recupereruse = async(req,res ,data) =>{
    Use.find((err, data)=>{
        res.json(data);
        
    });
}
//??

const recuperermedicament = async (req, res) => {

  var medi;
  if (req.body._id) {
      medi = await Use.findById(req.body._id)
  } else {
      medi = await Use.find()
  }

  res.send({ medi })
}

/**----------------------Supprimer un agent------------------- */


const destroy = async (req, res) => {
    const id = req.params.id;
    Use.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer Admin avec id=${id}. velo est possiblement introuvable!`
        });
      } else {
        res.send({
          message: "Admin supprimée avec succès!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer Admin avec id=" + id
      });
    });
    }

  module.exports ={
    register, login,recupereruse,updateuse,destroy,searchuse,recuperermedicament,update
    }