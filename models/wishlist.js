const mongoose = require('mongoose');

let Wishlist = new mongoose.Schema({
    user_id :{
        type : String,
        required : true,
    },
    hlc_id :{
        type : String,
        required : true,
    },
    user_name :{
        type : String,
        required : true,
    },
    salary :{
        type : String,
        required : true,
    },

    

},{timestamps:true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }}})

module.exports = mongoose.model('Wishlist',Wishlist)