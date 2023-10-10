const mongoose = require('mongoose');

let Bmdata = new mongoose.Schema({
    bm_id :{
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

    city : {
        type : String,
        required : true,
    },
    bank : {
        type : String,
        required : true,
    },
    branch : {
        type : String,
        required : true,
    },
    ifsc : {
        type : String,
        required : true,
    },
    phone : {
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

module.exports = mongoose.model('Bmdata',Bmdata)