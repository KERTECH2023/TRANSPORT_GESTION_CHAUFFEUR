const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const FactureSchema = new mongoose.Schema(
    {
        chauffeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chauffeur",
           required: true,
        },
        
       
      

        totalFareAmount: {
            type: Number,
        },
        nbretrajet:{
        type:Number
      },
      
        isPaid: {
            type: Boolean,
            default: false
        },
        montantTva:{
            type:Number,//5%montant
            
        },
        Year:{
            type:Number
        },
        Month:{
            type:Number
        },
    },
   
    {
        timestamps: true
    }
);

const Facture = mongoose.model('Facture', FactureSchema);
module.exports = Facture;
