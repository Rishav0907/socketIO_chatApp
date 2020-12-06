const express=require('express');
const bodyParser=require('body-parser')
const socketio=require('socket.io')
const http=require('http')
const app=express()
const server=http.createServer(app)
const port=5000 || process.env.PORT;
const path=require('path')
const io=socketio(server)


app.use(express.static(path.join(__dirname,'public')))

io.on('connection',socket=>{
    console.log("Client Connected");
    socket.emit('message','Welcome to ChatCord') // to the connecting clinet

    socket.broadcast.emit('message','A user has joined the chat') // to very client except the connecting client

    socket.on('disconnect',()=>{
        io.emit('message','A user has left')
    })

    //Listening for chat messages
    socket.on('chatMessage',(msg)=>{
        console.log(msg)
        io.emit('message',msg);
    })
})

server.listen(port,()=>{
    console.log('Server started')
})