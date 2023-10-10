const express = require('express');
const mongoose = require('mongoose');
const Hlcauth=require('./Hlcauth');
const Userauth=require('./Userauth')
const cors = require('cors');
const app = express();
const Chats=require('./Chats')

const Bmauth=require('./Bmauth')
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const bodyParser = require('body-parser');
const mysql = require('mysql');
app.use(express.json({limit: "30mb",extended:true}));
app.use(bodyParser.json());
app.use(cors())
mongoose.connect("mongodb+srv://test:test@test.njzn8ob.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true,
    useFindAndModify: false
}).then(
  result => {server.listen(5000),console.log('server connected with db')}
)
.catch(err => console.log(err));


app.use(express.json());
//app.use(cors({origin:"*"}))
////////////////////

// const connection = mysql.createConnection({
//   host: "bogzrhh8bzxgyk1gpagw-mysql.services.clever-cloud.com",
//   user: "ulbd2b4zbfs7h7nj",
//   password: "pHG3g3uHRpZckFWVO7hF",
//   database: "bogzrhh8bzxgyk1gpagw"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

// });
///////////////////////socket io


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
   console.log("User Disconnected", socket.id);
  });
});



/////////////////////sql 

app.use(Chats ,function (req, res, next) {
  // console.log("Middleware called")
   next();
 });
////////////////////hlc auth

 app.use(Hlcauth ,function (req, res, next) {
  // console.log("Middleware called")
  next();
});
app.use(Userauth ,function (req, res, next) {
  // console.log("Middleware called")
  next();
});
app.use(Bmauth ,function (req, res, next) {
  // console.log("Middleware called")
  next();
});


// ////////////////////

