const mongoose = require('mongoose');
  const itemSchema = mongoose.Schema({
    hlc_id:String,
    image:String
},{ timestamps: true })
      module.exports = mongoose.model('Item',itemSchema);
