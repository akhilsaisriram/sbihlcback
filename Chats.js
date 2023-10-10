const express = require('express');
const router1=express.Router();
const Chat = require('./models/chat'); 
const Item=require('./models/item')

router1.post('/postmessage',async(req, res)=>{
    
    const group_id = req.body.group_id
  const message = req.body.message

  Chat.findOneAndUpdate(
    { group_id: group_id },
    { $push: { messages: message } },
    { upsert: true }
  )
  .then(() => {
    console.log('Message saved successfully!');
    res.status(200).send('Message saved successfully!');
  })
  .catch((err) => {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message');
  });
  })



 ////////////////////////////////////////////////////////////////////////////////////// 

 router1.post('/hlcchatlist',async(req, res)=>{
    
  const hlcid = req.body.hlcid;
  const regex = new RegExp(`^${hlcid}`, 'i');
  try{
    let exist = await Chat.find({ group_id: { $regex: regex } });
    if(!exist){
        return res.status(400).send('User not found');
    }
   console.log(exist)
    res.json(exist);
}
catch(err){
    console.log(err);
    return res.status(500).send('Server Error')
}
})


////////////////////////////////////////file upload
router1.post('/sendfile',async (req, res) =>{
  
  try{
      
      const { hlcid} = req.body;
console.log(hlcid)
 
      let exist = await Item.find({ hlc_id: hlcid });
      if(!exist){
          return res.status(400).send('User not found');
      }
      console.log(exist)
      res.json(exist);
 
     
  }
  catch(err){
      console.log(err)
      return res.status(500).send('Internel Server Error')
  }
})



module.exports=router1