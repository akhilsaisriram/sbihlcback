const mongoose = require('mongoose');

let Acceptst = new mongoose.Schema({
    user_id :{
        type : String,
        required : true,
    },
    hlc_id :{
        type : String,
        required : true,
    },
    hlcname :{
        type : String,
        required : true,
    },
    username :{
        type : String,
        required : true,
    },
    statusa :{
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

module.exports = mongoose.model('Acceptst',Acceptst)