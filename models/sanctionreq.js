const mongoose = require('mongoose');
  const sanctionreq = mongoose.Schema({
    hlc_id:String,
    hlcname:String,
    user_id:String,
    username:String,
    ifsc:String,
    acno:String,
    sacamt:String,
    var : {
      type : String,
     default:0,
  },
  varfied : {
    type : String,
   default:0,
},
    los:String,
    day:String,
    month:String,
    year:String,
},{ timestamps: true })
      module.exports = mongoose.model('sanctionreq',sanctionreq);
