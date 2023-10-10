const express = require('express');
const router=express.Router();
const Chat = require('./models/chat'); 
const Registeruser = require('./models/model');
const Userform=require('./models/userform');
const Acceptst=require('./models/acceptstatus');
const Wishlist=require('./models/wishlist')
const sanctionreq=require('./models/sanctionreq')

router.post('/user_enq_san',async(req, res)=>{
  


    console.log("req u");
    // console.log(`Fetching `);
    try{
        const { user_id} = req.body;
        let exist = await sanctionreq.find({ user_id:user_id });
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

  router.post('/perforgraphmain',async(req, res)=>{
  


    
    // console.log(`Fetching `);
    try{

        const {mon,y,hlc_id,ifsc} = req.body;
       // console.log(mon);
        let exist = await sanctionreq.find({hlc_id:hlc_id, month:mon,year:y,var:"1",varfied:"1" });
        let sum = 0;

        for (let i = 0; i < exist.length; i++) {
            const number = parseInt(exist[i].sacamt, 10);
            if (!isNaN(number)) {
              sum += number;
            }
          }

        if(!exist){
            res.json(sum);
        }
        console.log(sum)
        res.json(sum);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })

  router.post('/perforgraph',async(req, res)=>{
  


    
    // console.log(`Fetching `);
    try{

        const {mon,y,hlc_id,ifsc} = req.body;
       // console.log(mon);
        let exist = await sanctionreq.find({hlc_id:hlc_id, month:mon,year:y,ifsc:ifsc,var:"1",varfied:"1" });
        let sum = 0;

        for (let i = 0; i < exist.length; i++) {
            const number = parseInt(exist[i].sacamt, 10);
            if (!isNaN(number)) {
              sum += number;
            }
          }

        if(!exist){
            res.json(sum);
        }
        console.log(sum)
        res.json(sum);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })
  

  router.post('/perforgraphyear',async(req, res)=>{
  


    
    // console.log(`Fetching `);
    try{

        const {y,hlc_id,ifsc} = req.body;
        console.log(ifsc);
        let exist = await sanctionreq.find({hlc_id:hlc_id,year:y,ifsc:ifsc,var:"1",varfied:"1" });
        let sum = 0;

        for (let i = 0; i < exist.length; i++) {
            const number = parseInt(exist[i].sacamt, 10);
            if (!isNaN(number)) {
              sum += number;
            }
          }

        if(!exist){
            res.json(sum);
        }
      //  console.log("gg",exist)
        res.json(sum);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
  })
module.exports=router