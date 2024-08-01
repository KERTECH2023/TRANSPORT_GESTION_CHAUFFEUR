const express = require('express')
const  router = express.Router()


const RideContro  = require('../Controllers/RideController')
router.post('/postRide', RideContro.saveRide);
//router.get('/fact', RideContro.getfact)

module.exports = router