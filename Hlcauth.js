const express = require('express');
const router=express.Router();
const Chat = require('./models/chat'); 
const Registeruser = require('./models/model');
const Userform=require('./models/userform');
const Acceptst=require('./models/acceptstatus');
const Wishlist=require('./models/wishlist')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const sanctionreq=require('./models/sanctionreq');
const Bmdata=require('./models/bmdata')
router.post('/register',async (req, res) =>{
  
    try{
        
        const {username,email,password, city,bank,phone,cando,exp} = req.body;
        var date = new Date();
        var current_date = date.getFullYear()+""+(date.getMonth()+1)+""+ date.getDate();
        var current_time = date.getHours()+""+date.getMinutes()+""+ date.getSeconds();
        var id = current_date+current_time;	
      
        let exist = await Registeruser.findOne({email})
   

        if(exist){
            return res.status(400).send('User Already Exist')
        }
       
        let newUser = new Registeruser({
            id,
            username,
            email,
            password,
            city,
            bank,
            phone,
            cando,
            exp
        })

        await newUser.save();
        res.status(200).send('Registered Successfully')
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

router.post('/login',async (req, res) => {
    try{   console.log("ok in")
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist) {
            return res.status(400).send('User Not Found');
        }
        if(exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
          (err,token) =>{
              if (err) throw err;
              return res.json({token})
          }  
            )
         
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

router.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})


router.get('/hlc',async(req, res)=>{
    try{
        let exist = await Registeruser.find();
        if(!exist){
            return res.status(400).send('User not found');
        }
    //   console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

router.post('/hlcdata',async(req, res)=>{
  
    try{
      
     console.log(req.body.id)
        let exist = await Registeruser.findById(req.body.id);
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


  router.post('/writereview',async(req, res)=>{
  
    try{
        const _id = req.body.id
        const message = req.body.review
 
     Registeruser.findOneAndUpdate(
        { _id: _id },
        { $push: { reviews: message } },
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
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


/////////////////////////////////userform

router.post('/filluserform',async (req, res) =>{
  
    try{
        
        const { user_id,hlc_id,username,email,phone,adhar,pan,newaddress,salary,occupation,presentaddress} = req.body;
        // var date = new Date();
        // var current_date = date.getFullYear()+""+(date.getMonth()+1)+""+ date.getDate();
        // var current_time = date.getHours()+""+date.getMinutes()+""+ date.getSeconds();
        // var id = current_date+current_time;	
      
        let exist = await Userform.findOne({email})
   

        // if(exist){
        //     return res.status(400).send('User Already Exist')
        // }
       
        let newUser = new Userform({
            user_id,
            hlc_id,
            username,
            email,
            presentaddress,
            newaddress,
            phone,
            adhar,
            pan,
            occupation,
            salary
        })

        await newUser.save();
        res.status(200).send(' Successfully added')
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

router.post('/getuserform',async(req, res)=>{
  
    const user_id = req.body.user_id;
    const hlc_id=req.body.hlc_id;
    // console.log(user_id,hlc_id);
    // console.log(`Fetching `);
    try{
        let exist = await Userform.find({ user_id:user_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
      //  console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/putacceptst',async(req, res)=>{
  
    const user_id = req.body.user_id;
    const hlc_id=req.body.hlc_id;
    const statusa=req.body.st;
    const hlcname=req.body.name;
    const username=req.body.uname;
    // console.log(user_id,hlc_id);
    // console.log(`Fetching `);
    try{
        Acceptst.findOneAndUpdate(
            { user_id: user_id,hlc_id:hlc_id ,hlcname,username},
            {statusa:statusa },
            { upsert: true }
          )
          .then(() => {
            console.log('status saved successfully!');
            res.status(200).send('Message saved successfully!');
          })
          .catch((err) => {
            console.error('Error saving message:', err);
            res.status(500).send('Error saving message');
          });
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


  router.post('/getacceptst',async(req, res)=>{
  
    const user_id = req.body.user_id;
    const hlc_id=req.body.hlc_id;
   
    // console.log(user_id,hlc_id);
    // console.log(`Fetching `);
    try{
        let exist = await Acceptst.find({ user_id:user_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
       // console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


  router.post('/getaclist',async(req, res)=>{

    const hlc_id=req.body.hlcid;
   
    //console.log(hlc_id);
    // console.log(`Fetching `);
    try{
        let exist = await Acceptst.find({ hlc_id:hlc_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
       //console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/getfavlistofuser',async(req, res)=>{
  
    const user_id = req.body.user_id;
    const hlc_id=req.body.hlcid;
   
     console.log(hlc_id);
    // console.log(`Fetching `);
    try{
        let exist = await Wishlist.find({ hlc_id:hlc_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
       // console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


/////////////////////////////////////

///////////////////////////////favlist
router.post('/addfavlist',async (req, res) =>{
  
    try{
        
        const { user_id,hlc_id,user_name,salary} = req.body;
        // var date = new Date();
        // var current_date = date.getFullYear()+""+(date.getMonth()+1)+""+ date.getDate();
        // var current_time = date.getHours()+""+date.getMinutes()+""+ date.getSeconds();
        // var id = current_date+current_time;	
      console.log(user_name)
        let exist = await Wishlist.findOne({user_id})
   

        if(exist){
            return res.status(400).send('User Already Exist')
        }
       
        let newUser = new Wishlist({
            user_id,
            hlc_id,
            user_name,
            salary
        })

        await newUser.save();
        res.status(200).send(' Successfully fav list updated')
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

router.post('/getfavlist',async(req, res)=>{
  
    const user_id = req.body.user_id;
    const hlc_id=req.body.hlc_id;
   
    // console.log(user_id,hlc_id);
    // console.log(`Fetching `);
    try{
        let exist = await Acceptst.find({ user_id:user_id,hlc_id:hlc_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
       // console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

//////////////////////////////////////////
  router.post('/chathistory',async(req, res)=>{
  
    const group_id = req.body.group_id
    console.log(`Fetching chat history for group_id=${group_id}...`);
    try{
        let exist = await Chat.find({ group_id: group_id });
        if(!exist){
            return res.status(400).send('User not found');
        }
       // console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/reqbm',async(req, res)=>{
  
    const group_id = req.body.hlc_id
    //console.log(`Fetching chat history for group_id=${group_id}...`);
    try{
        Registeruser.findOneAndUpdate(
            {_id:group_id },
            {varreq:"1" },
            { upsert: true }
          )
          .then(() => {
            console.log('status saved successfully!');
            res.status(200).send('Message saved successfully!');
          })
          .catch((err) => {
            console.error('Error saving message:', err);
            res.status(500).send('Error saving message');
          });
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/sanctionreq',async(req, res)=>{
  

    console.log("req");
    // console.log(`Fetching `);
    const d = new Date();
    const month =d.getMonth();
    const year=d.getFullYear();
    const day=d.getDate();
    try{
        const { user_id,hlc_id,ifsc,sacamt,los,hlcname,username,acno} = req.body;
       // console.log(user_id,hlc_id,ifsc,sacamt,los,hlcname,username)
        let newUser = new sanctionreq({
            user_id,hlc_id,ifsc,sacamt,los,hlcname,username,acno,day,month,year
        })

        await newUser.save();
        res.status(200).send('request  send')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/sanctionlist',async(req, res)=>{
  

    console.log("req");
    // console.log(`Fetching `);
    try{
        const {hlc_id} = req.body;
        let exist = await sanctionreq.find({ hlc_id: hlc_id });
      
       // console.log(exist)
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


  router.post('/sanamthlc',async(req, res)=>{
  

    console.log("req");
    const d = new Date();
    const month =d.getMonth() ;
    const y=d.getFullYear();

    const jj=y+"-"+month;

    try{
        const {hlc_id} = req.body;
      
        let exist = await sanctionreq.find({ hlc_id: hlc_id,var:"1",varfied:"1",month:month,year:y});
        let sum = 0;

        for (let i = 0; i < exist.length; i++) {
            const number = parseInt(exist[i].sacamt, 10);
            if (!isNaN(number)) {
              sum += number;
            }
          }

        //console.log(exist)
        res.json(sum);
      
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })


  router.post('/allbmdata',async(req, res)=>{
  


    try{
        let exist = await Bmdata.find()
console.log(exist)
res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/hlcbmlos',async (req, res) =>{
  
    try{
        
  console.log("jjj")

  const {hlc_id} = req.body;

   console.log(hlc_id)
  let exist = await sanctionreq.find({hlc_id: hlc_id })

//console.log(exist)
 
  res.json(exist); 
  

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
  })


module.exports=router