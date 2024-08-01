const express = require('express')
const  router = express.Router()


const Reclamation  = require('../Controllers/ReclamationContro')


router.get('/show', Reclamation.getAll)



 
router.post('/add',Reclamation.adds)


router.get('/getrec/:agent', Reclamation.getAllbyagent);
router.get('/getrecF/:agent', Reclamation.recuprecF);
router.put('/upRec/:id', Reclamation.updatestatus);
router.get('/searshrec/:id', Reclamation.searchrec);




module.exports = router