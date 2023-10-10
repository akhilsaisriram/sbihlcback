const mongoose = require('mongoose');

let Userform = new mongoose.Schema({
    user_id :{
        type : String,
        required : true,
    },
    hlc_id :{
        type : String,
        required : true,
    },
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
 
    presentaddress : {
        type : String,
        required : true,
    },
    newaddress : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    adhar : {
        type : String,
        required : true,
    },
    pan : {
        type : String,
        required : true,
    },
    occupation : {
        type : String,
       default:0,
    },
    salary : {
        type : String,
       default:0,
    }
    

},{timestamps:true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }}})

module.exports = mongoose.model('Userform',Userform)