const mongoose = require('mongoose');

let Registeruser = new mongoose.Schema({
 
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required:true,
    },
    city : {
        type : String,
        required : true,
    },
    bank : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    cando : {
        type : String,
        required : true,
    },
    exp : {
        type : String,
        required : true,
    },
    var : {
        type : String,
       default:0,
    },
    varreq : {
        type : String,
       default:0,
    },
    rating : {
        type : String,
       default:0,
    },
    reviews: [
        {
          sendername: String,
          sender_id: String,
          timestamp: Date,
          message_text: String,
          rate:String,
        }
      ]

},{timestamps:true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }}})

module.exports = mongoose.model('Registeruser',Registeruser)