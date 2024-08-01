const Voiture = require ("../Models/Voiture")



exports.addvoiture = async (req, res) => {
    const { modelle , immatriculation} = req.body;
    const chauffeurId = req.params.id;
    
 
// const {firebaseUrl} =req.file ? req.file : "";

/*
const cartegriseUrl = req.uploadedFiles.cartegrise || '';
const assuranceUrl = req.uploadedFiles.assurance || '';
*/
const cartegriseUrl = req.uploadedFiles.photoAvatar ;
  const assuranceUrl = req.uploadedFiles.photoPermisRec ;
  





  
    const verifUtilisateur = await Voiture.findOne({ immatriculation });
    if (verifUtilisateur) {
      res.status(403).send({ message: "Voiture existe deja !" });
    } else {
      const nouveauUtilisateur = new Voiture();

  



      nouveauUtilisateur.modelle = modelle;
      nouveauUtilisateur.immatriculation = immatriculation;
      nouveauUtilisateur.cartegrise = cartegriseUrl;
      nouveauUtilisateur.assurance = assuranceUrl;
      nouveauUtilisateur.chauffeur = chauffeurId;

   
  
      console.log (
        nouveauUtilisateur
    )


    
      nouveauUtilisateur.save();
  
     
      // token creation
      res.status(201).send({ message: "success" });
    }
  };

//   exports.getBychauff = async (req, res) => {
//     res.send({
//         rec: await Voiture.find({chauffeur: req.params.id})
            
//     })
// }

// exports.getBychauff = async(req,res,data) =>{
   
//     Voiture.find({ chauffeur: req.params.id },(err, data)=>{
      
//         res.send(data);
//         console.log(data)
        
//     });
// }

exports.getBychauff = async (req, res) => {
    Voiture.find({ chauffeur: req.params.id })
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Agent introuvable pour id " + chauffeur });
        } else {
          // Extract the first element from the array
          const response = data[0];
          res.send(response);
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Erreur récupération Agent avec id=" + chauffeur });
      });
  }
  
