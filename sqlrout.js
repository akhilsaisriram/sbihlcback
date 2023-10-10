// const express = require('express');
// const routersql=express.Router();







// routersql.post('/getids',async(req,res)=>{

//     var sql = 'SELECT * FROM chat WHERE toid = ?  AND fromid=?  OR toid=? And fromid=?';
//    await connection.query ( await sql, await [req.body.toid,req.body.fromid,req.body.fromid,req.body.toid], await function (err, result1) {
//     if (err) throw err;
//   //console.log(result1)
//     return res.json({result1})
  
//   })
//   });
  
//   routersql.post('/getidschat',async(req,res)=>{
  
//     var sql = 'SELECT * FROM chat WHERE toid = ?  AND fromid=?  OR toid=? And fromid=?';
//    await connection.query ( await sql, await [req.body.toid,req.body.fromid,req.body.fromid,req.body.toid], await function (err, result2) {
//     if (err) throw err;
//   //console.log(result1)
//     return res.json({result2})
  
//   })
//   });
  
  
//   routersql.post('/getidschathl',async(req,res)=>{
  
//     var sql = 'SELECT * FROM chat WHERE toid = ?  AND fromid=?  OR toid=? And fromid=?';
//    await connection.query ( await sql, await [req.body.toid,req.body.fromid,req.body.fromid,req.body.toid], await function (err, result21) {
//     if (err) throw err;
//   //console.log(result1)
//     return res.json({result21})
  
//   })
//   });
  
  
//   routersql.post('/getloandata',async(req,res)=>{
  
//     var sql = 'SELECT * FROM loandata WHERE toid = ?  AND fromid=? ';
//    await connection.query ( await sql, await [req.body.fromid,req.body.toid], await function (err, result3) {
//     if (err) throw err;
//   //console.log(req.body.toid,req.body.fromid)
//     return res.json({result3})
  
//   })
//   });
  
//   routersql.post('/senmes',async(req,res)=>{
  
//     let d={toid:req.body.toid,fromid:req.body.fromid,message: req.body.message};
//     var sql = 'insert into chat (message,fromid,toid,ft,tt) VALUES(?,?,?,?,?)';
//     await connection.query ( await sql, await [req.body.message,req.body.fromid,req.body.toid,req.body.ft,req.body.tt], await function (err, result1) {
//       if (err) throw err;
//       console.log(result1)
//       return res.json({result1})
  
//     })
  
//   });
  
  
//   routersql.post('/senmeshl',async(req,res)=>{
//     const date = new Date();
  
//     // get the date as a string
//     const n = date.toDateString();
    
//     // get the time as a string
//     const time = date.toLocaleTimeString();
//   console.log("in come from hlc",time )
//     let d={toid:req.body.toid,fromid:req.body.fromid,message: req.body.message};
//     var sql = 'insert into chat (message,fromid,toid,ft,tt) VALUES(?,?,?,?,?)';
//     await connection.query ( await sql, await [req.body.message,req.body.fromid,req.body.toid,req.body.ft,req.body.tt], await function (err, result1) {
//       if (err) throw err;
//       console.log(result1)
//       console.log("in come from hlc")
//       return res.json({result1})
  
//     })
  
//   });
  
  
//   routersql.post('/hlcwishlist',async(req,res)=>{
  
//     let d={toid:req.body.toid,fromid:req.body.fromid,message: req.body.message};
//     var sql = 'insert into hlcwishlist (hid,cid,income) VALUES(?,?,?)';
//     await connection.query ( await sql, await [req.body.fromid,req.body.toid,req.body.income], await function (err, result15) {
//       if (err) throw err;
  
//       return res.json({result15})
  
//     })
  
//   });
  
//   routersql.post('/getrev',async(req,res)=>{
//     var sql = 'SELECT * FROM review WHERE toid = ? ';
//     await connection.query ( await sql, await [req.body.toid], await function (err, resu) {
//      if (err) throw err;
//     // console.log(resu)
//      return res.json({resu})
   
//    })
  
//   });
  
//   routersql.post('/sendud',async(req,res)=>{
//     var sql = 'insert into loandata (name,email,phone,adhar,pan,address,income,occupation,toid,fromid,act,hlcname) VALUES(?,?,?,?,?,?,?,?,?,?,"0",?)';
//     await connection.query ( await sql, await [req.body.name,req.body.email,req.body.phone,req.body.adhar,req.body.pan,req.body.address,req.body.income,req.body.occupation,req.body.toid,req.body.fromid,req.body.hlcname], await function (err, resu) {
//      if (err) throw err;
//      console.log(resu)
//      return res.json({resu})
   
//    })
  
//   });
//   routersql.post('/accept',async(req,res)=>{
//     var sql = 'update loandata set act="2" where id=?';
//     await connection.query ( await sql, await [req.body.id], await function (err, resu) {
//      if (err) throw err;
//      console.log(resu)
//      return res.json({resu})
   
//    })
  
//   });
  
//   routersql.post('/accptststus',async(req,res)=>{
//     var sql = 'SELECT * FROM loandata WHERE fromid = ? ';
//     await connection.query ( await sql, await [req.body.fromid], await function (err, status1) {
//      if (err) throw err;
//     // console.log(status1)
//      return res.json({status1})
   
//    })
  
//   });
  
//   routersql.get('/hlc', (req, res) => {
//     connection.query("SELECT * FROM hlc;", (err, results, fields) => {
//       if(err) throw err;
//   //console.log(results)
   
//     res.json(results);
//     });
//   });
   
  
//   routersql.post('/perhlc', (req, res) => {
//     var sql = 'SELECT * FROM hlc WHERE id = ? ';
//     connection.query (  sql,  [req.body.toid],  function (err, status12) {
//      if (err) throw err;
//     //console.log(status12)
//      return res.json({status12})
   
//    })
  
//   });
  
//   routersql.post('/getchatun',async(req,res)=>{
  
//     var sql = 'SELECT DISTINCT fromid FROM chat WHERE toid = ? ';
//    await connection.query ( await sql, await [req.body.mid], await function (err, result1) {
//     if (err) throw err;
  
//     return res.json({result1})
  
//   })
//   });
  
  
// module.exports=routersql