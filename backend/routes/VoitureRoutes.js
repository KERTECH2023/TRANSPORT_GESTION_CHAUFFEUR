const express = require('express')
const  router = express.Router()


const VoitureCon  = require('../Controllers/VoitureContro')

const UploadImage = require ("../services/firebase");


const multer = require('multer')

const Multer = multer({
  storage:multer.memoryStorage(),
  limits:1024 * 1024,
})


router.post('/addvoiture/:id',Multer.fields([
    { name: "cartegrise", maxCount: 1  },
    { name: "assurance", maxCount: 1  },
  
  ]),UploadImage,VoitureCon.addvoiture)

  router.get('/getvoi/:id', VoitureCon.getBychauff);
  module.exports = router