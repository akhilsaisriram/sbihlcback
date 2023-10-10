const mongoose = require ( 'mongoose');
const schema = mongoose. Schema;
const chatSchema = new schema({
   group_id: String,
   messages: [
     {
      author_id:String,
       author: String,
       time:String,
       message_text: String
     }
   ]
 })
 
const Chat = mongoose. model ('Chat' , chatSchema) ;
module.exports=Chat;