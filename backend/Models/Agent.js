const mongoose  =require('mongoose')
const Schema  =mongoose.Schema
const validator = require('validator');

const AgentSchema = new mongoose.Schema(
    {
       
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
                values: ['male', 'female','-'],
                message: '{VALUE} is not supported'
                
            },
            default: '-'
            
        },
        role: {
            type: String,
            default: 'Agent'
            
        },

        Nationalite: {
            type: String,
            trim: true,
            required: [true, 'Please provide a Nationalite'],
            default: '-'
        },
        photoAvatar: {
            type: String,
            //default: 'https://storage.googleapis.com/imagestor-768b5.appspot.com/1677485204106.jpg'
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
        }
    },
     {timestamps: true},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
AgentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        
    }
});

const Agent = mongoose.model('Agent',AgentSchema)
module.exports = Agent