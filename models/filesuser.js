const mongoose = require('mongoose');
  const fileuser = mongoose.Schema({
    hlc_id:String,
    user_id:String,
    pdf1:String,
    pdf2:String,
    pdf3:String,
    pdf4:String,
},{ timestamps: true })
      module.exports = mongoose.model('fileuser',fileuser);
