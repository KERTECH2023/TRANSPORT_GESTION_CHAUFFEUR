const express = require('express')
const  router = express.Router()


const ChauffContro  = require('../Controllers/ChauffContro')
const tarifContro  = require('../Controllers/TarifsC')

//const UploadImage = require ("../services/firebase");
const UploadImage = require ("../services/firebase");


const multer = require('multer')

const Multer = multer({
  storage:multer.memoryStorage(),
  limits:1024 * 1024,
})



router.get('/affiche', ChauffContro.recupereruse)

router.get('/getchdes', ChauffContro.chauffdes)



router.delete('/destroychauff/:id', ChauffContro.destroy);
 
// router.post('/AjoutChauf',Multer.single("photoAvatar"),UploadImage,ChauffContro.register)

router.post('/AjoutChauf',Multer.fields([
  { name: "photoAvatar", maxCount: 1  },
  { name: "photoPermisRec", maxCount: 1  },
  { name: "photoPermisVer", maxCount: 1  },
  { name: "photoVtc", maxCount: 1  },
  { name: "photoCin", maxCount: 1  },

]),UploadImage,ChauffContro.register)

router.put('/updatechauf/:id',Multer.fields([
  { name: "photoAvatar", maxCount: 1  },
  { name: "photoPermisRec", maxCount: 1  },
  { name: "photoPermisVer", maxCount: 1  },
  { name: "photoVtc", maxCount: 1  },
  { name: "photoCin", maxCount: 1  },

]),UploadImage,ChauffContro.update)

router.post('/loginch',ChauffContro.login)
router.get('/searchchauf/:id', ChauffContro.searchuse);
router.get('/newchauf', ChauffContro.recuperernewchauf);
//router.get('/getAg', AuthController.recupereruse);
// router.put('/updatechauf/:id',Multer.single("photoAvatar"),UploadImage, ChauffContro.update);
router.put('/updatestatus/:id', ChauffContro.updatestatus);
router.put('/updatestatuss/:id', ChauffContro.updatestatuss);
//router.options('/facture-amounts',factureUpdate);
//router.get('/factures/:chauffeurId', ChauffContro.getFacturesByChauffeurId);
router.get('/factures', ChauffContro.recuperFact);
router.get('/factures/:id', ChauffContro.searchFacture);

router.put('/updatefacture/:id', ChauffContro.updateFact);


module.exports = router