const express = require('express')
const  router = express.Router()


const ClientContro  = require('../Controllers/ClientContro')

const UploadImage = require ("../services/firebase");

const multer = require('multer')

const Multer = multer({
  storage:multer.memoryStorage(),
  limits:1024 * 1024,
})


router.get('/afficheCl', ClientContro.recupereruse)



router.delete('/destroyCl/:id', ClientContro.destroy);
 
// router.post('/AjoutCl',Multer.single("photoAvatar"),UploadImage,ClientContro.register)

router.post('/AjoutCl',Multer.fields([
  { name: "photoAvatar", maxCount: 1  },


]),UploadImage,ClientContro.register);

//router.post('/loginAg',AuthController.login)
router.get('/searchCl/:id', ClientContro.searchuse);
//router.get('/getAg', AuthController.recupereruse);
// router.put('/updateCl/:id',Multer.single("photoAvatar"),UploadImage, ClientContro.update);

router.put('/updateCl/:id',Multer.fields([
  { name: "photoAvatar", maxCount: 1  },
 

]),UploadImage,ClientContro.update);


router.put('/updatestatus/:id', ClientContro.updatestatus);
router.put('/updatestatuss/:id', ClientContro.updatestatuss);
router.get('/getchdes', ClientContro.Clientdesa)

module.exports = router