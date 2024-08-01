const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const adminSchema = new Schema({
  
 Firstname:{
        type : String
    },
    Lastname:{
        type : String
    },

    email :{
        type : String,
   
    },
    phone : {
        type :String

    },
    password : {
        type :String

    },

    photo : {
        type :String

    },
    //isVerified: { type: Boolean },
 
   
} , {timestamps: true})
adminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        
    }
});

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin