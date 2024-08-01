const mongoose = require('mongoose');
const Facture = require('./Facture');
const Chauffeur = require("./Chauffeur");

const rideRequestSchema = new mongoose.Schema({
  
  HealthStatus: {
    type: String,
    default: 'None'
  },
  destination: {
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
      
    }
    
  },
  destinationAddress: {
    type: String,
    
  },
  driverLocationData: {
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
      
    }
    
  },
  fareAmount:{
    type:Number,
  },
   
    driverPhone: {
      type: String,
      
    },
  source: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    }
  },
  status: {
    type: String,
  },
  time: {
    type: Date,
    
  },
  userName: {
    type: String,
  },
  userPhone: {
    type: String,
  }
});



const RideRequest = mongoose.model('RideRequest', rideRequestSchema);

module.exports = RideRequest;
