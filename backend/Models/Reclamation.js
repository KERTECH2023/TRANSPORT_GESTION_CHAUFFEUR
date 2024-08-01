const mongoose  =require('mongoose')
const Schema  =mongoose.Schema


const ReclamationSchema = new mongoose.Schema(
    {
       
        titre: {
            type: String,
          
        },
        NumRec: {
            type: String,
            unique: true
          
        },
        nom: {
            type: String,
          
        },
        prenom: {
            type: String,
          
        },
        phone: {
            type: String,
          
        },
        daterec: {
            type: Date,
   
        },
      
        objectrec: {
            type: String,
            
        },
        role: {
            type: String,
            
        },
     
      
        status: {
            type: String,
            default: 'En cours'
            
        },

      
      
        isActive: {
            type: Boolean,
            default: true
            // select: false
        },

        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent"
        },
      
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        }
    },
     {timestamps: true},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
ReclamationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        
    }
});

const Reclamation = mongoose.model('Reclamation',ReclamationSchema)
module.exports = Reclamation