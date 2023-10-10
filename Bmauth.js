const express = require('express');
const router1=express.Router();
const Chat = require('./models/chat'); 
const Item=require('./models/item')
const Bmdata=require('./models/bmdata')
const Registeruser = require('./models/model');
const fileuser=require('./models/filesuser');
const sanctionreq=require('./models/sanctionreq')
////////////////////////////////////////file upload
router1.post('/getfile',async (req, res) =>{
  
  try{
      
      const { hlcid} = req.body;
console.log(hlcid)
 
      let exist = await Item.find({ hlc_id: hlcid });
      if(!exist){
          return res.status(400).send('User not found');
      }
      //console.log(exist)
      res.json(exist);
 
     
  }
  catch(err){
      console.log(err)
      return res.status(500).send('Internel Server Error')
  }
})


router1.post('/sendfileuser',async (req, res) =>{
  
  try{
      console.log("jkj")
    const { pdf1,pdf2,user_id,hlc_id } = req.body;
// console.log(user_id)
// console.log("hlc",hlc_id)
 
let newUser = new fileuser({
  pdf1,pdf2,user_id,hlc_id 
})

await newUser.save();
console.log("ok file send")
res.status(200).send('file uploded')
 
     
  }
  catch(err){
      console.log(err)
      return res.status(500).send('Internel Server Error')
  }
})


router1.post('/getuserfiles',async (req, res) =>{
  
  try{
      
      const { hlcid,user_id} = req.body;
console.log("file",hlcid,user_id)

      let exist = await fileuser.find({ hlc_id: hlcid,user_id:user_id });
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

router1.post('/bmdataupdate',async (req, res) =>{
  
    try{
        
        const { bm_id,username,email,phone,city,bank,branch,exp,ifsc} = req.body;

   
        let exist = await Bmdata.findOne({bm_id})
  

        if(exist){
            return res.send('User Already Exist')
        }
       
        let newUser = new Bmdata({
            bm_id,username,email,phone,city,bank,branch,exp,ifsc
        })

        await newUser.save();
        res.status(200).send('Registered updated')
   
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })

  router1.post('/getbmdata',async (req, res) =>{
  
    try{
        
        const { bm_id} = req.body;

   
        let exist = await Bmdata.findOne({bm_id})
  

        if(!exist){
            return res.send('User Already Exist')
        }
       
        res.json(exist); 
   
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })



  router1.post('/getvar_req_hlc',async (req, res) =>{
  
    try{
        
  
//console.log(  req.body.branch)

   const regexPattern = new RegExp('.*' +  req.body.branch + '.*', 'i');
        let exist = await Registeruser.find({ cando: regexPattern });
  

      
      // console.log(exist)
        res.json(exist); 
   
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })


  router1.post('/acceptreq',async (req, res) =>{
  
    try{
        
  console.log("jjj")
console.log( "fg", req.body.hlcid)

   Registeruser.findOneAndUpdate(
    { _id: req.body.hlcid },
    { var:"1",varreq:"0"},
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
   
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })

  router1.post('/acceptreq',async (req, res) =>{
  
    try{
        
  console.log("jjj")
console.log( "fg", req.body.hlcid)

   Registeruser.findOneAndUpdate(
    { _id: req.body.hlcid },
    { varreq:"0"},
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
   
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })



  router1.post('/bmlosvar',async (req, res) =>{
  
    try{
        
  console.log("jjj")

  const { ifsc} = req.body;

   
  let exist = await sanctionreq.find({ifsc:ifsc,var:"0"})

//console.log(exist)
 
  res.json(exist); 
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })

  
  router1.post('/bmlosvaruser',async (req, res) =>{
  
    try{
        
  console.log("jjj")

  const { hlc_id} = req.body;
console.log(hlc_id)
   
  let exist = await sanctionreq.find({hlc_id:hlc_id,var:"0"})

console.log(exist)
 
  res.json(exist); 
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })



  router1.post('/losvarification',async (req, res) =>{
  
    try{
        
  console.log("jjj")
console.log( "fg", req.body.hlcid)

   sanctionreq.findOneAndUpdate(
    { user_id: req.body.userid,hlc_id:req.body.hlcid},
    { var:req.body.var,varfied:req.body.varfied},
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
   
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })


module.exports=router1