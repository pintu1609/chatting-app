'use strict';
const http = require('http');

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIO = require('socket.io');

require("dotenv").config();
const db = require("./api/middlewares/db");

const routes = require('./api/routes/index.js');

const { useErrorHandler } = require('./api/middlewares/error-handler');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static("public"));

app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(cors());
app.use(db.connectToDatabase);
app.use('/api/v1/', routes);
const server = http.createServer(app);
const io = socketIO(server,{cors:{origin:'*'}});

const onlineuser={
  
}

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('join', (userId) => {
      onlineuser[socket.id]={id:userId, typing:false};
      socket.join(userId);  // Join a room with the user's ID
      io.emit('online', userId);  // Broadcast 'online' event to all clients
    });
    socket.on(
      'isonline', (userId) =>{
        console.log(userId)
        const user = Object.values(onlineuser)
        let isonline=false
        for (let i = 0; i < user.length; i++) {
          if (user[i].id==userId) {
            isonline=true;
            
          }
        } 
        if(isonline){
          socket.emit('online', userId)
        }else{
          socket.emit('offline', userId)

        }
          
      }
    )
  socket.on('ping',(istyping)=>{
    if(onlineuser[socket.id]){
      onlineuser[socket.id].typing = istyping

    }
  } )

  socket.on(
    'pong', (userId) =>{
      const user = Object.values(onlineuser)
      let istyping=false
      for (let i = 0; i < user.length; i++) {
        if (user[i].id==userId) {
          istyping=user[i].typing;
          
        }
      } 
      socket.emit('istyping',istyping)
        
    }
  )
    socket.on('disconnect', () => {
      console.log('User disconnected');
      delete onlineuser[socket.id];

      // io.emit('offline', socket.id);  // Broadcast 'offline' event to all clients
    });
  });

const portNumber = process.env.PORT || 5000; 
server.listen(portNumber, (err) => {
    console.log("portNumber ", process.env.PORT);
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${portNumber}`);
    }
});

app.use(useErrorHandler);

