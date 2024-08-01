const mongoose  =require('mongoose')
const Schema  =mongoose.Schema
const validator = require('validator');


const ChauffSchema = new mongoose.Schema(
    {

        username: {
            type: String,
            unique: true
          },
       
        Nom: {
            type: String,
            trim: true,
            maxlength: [20, 'FName must be less or equal then 20 characters.']
        },
        Prenom: {
            type: String,
            trim: true,
            maxlength: [20, 'LName must be less or equal then 20 characters.'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        phone: {
            type: String,
            // required: [true, 'Please provide your phone'],
            // minlength: 8,
            unique: true
        },
        password: {
            type: String,
            
        },
        DateNaissance: {
            type: Date,
            required: [true, 'Please provide a DateNaissance'],
           
        },
        gender: {
            type: String,
            enum: {
                values: ['Homme', 'Femme','-'],
                message: '{VALUE} is not supported'
                
            },
            default: '-'
            
        },
        role: {
            type: String,
          
            
        },
        Cstatus: {
            type: String,
          
            
        },

      
        photoAvatar: {
            type: String,
            // default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
        },
        photoCin: {
            type: String,

            // default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
        },
        photoPermisRec: {
            type: String,
            
            // default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
        },
        photoPermisVer: {
            type: String,
            // default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
        },
        photoVtc: {
            type: String,
            // default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
        },
       
       
          cnicNo: {
            type: String,
            required: [true, "Please provide a cnic."],
            unique: true
          },
        

          address: {
            type: String,
            trim: true,
            required: [true, "Please provide an address"],
            maxlength: [40, "Address must be less or equal then 30 characters."],
            minlength: [8, "Address must be more or equal then 8 characters."],
          },
          
          ratingsAverage: {
            type: Number,
            default: 1,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be below 5.0"],
            set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
            
          },

          ratingsQuantity: {
            type: Number,
            default: 0,
          },
          postalCode: {
            type: String,
            // validate: [validator.isPostalCodeLocales, 'Please provide valid postal code']
          },
          isActive: {
            type: Boolean,
            default: true
            // select: false
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        tarif: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tarifs"
        },

      
        
    },
     {timestamps: true},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
ChauffSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        
    }
});


const Chauffeur = mongoose.model('Chauffeur',ChauffSchema)
module.exports = Chauffeur