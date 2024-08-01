const express = require('express')
const  router = express.Router()


const AuthController  = require('../Controllers/AuthController')

const UploadImage = require ("../services/firebase");

const multer = require('multer')

const Multer = multer({
  storage:multer.memoryStorage(),
  limits:1024 * 1024,
})


router.get('/show', AuthController.recupereruse)



router.delete('/destroy/:id', AuthController.destroy);
 
router.post('/register',Multer.single("photo"),UploadImage,AuthController.register)
router.post('/login',AuthController.login)
router.get('/searchuse/:id', AuthController.searchuse);
router.get('/getuser', AuthController.recupereruse);
router.put('/updateuse/:id',Multer.single("photo"),UploadImage, AuthController.update);



module.exports = router