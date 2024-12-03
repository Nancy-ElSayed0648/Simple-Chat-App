import express from "express"
import { dbConnection } from "./db/dbConnection.js"
import { Server } from "socket.io"
const app = express()
const port = 3000


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))




const io = new Server(server,{
    cors: {
        origin: "*"
    }
})


io.on("connection",(socket)=>{
    console.log("a new client connected")

    socket.on("chatMsg",(msg)=>{
        io.emit("reply",msg)
    })

    socket.on("typing",()=>{
        socket.broadcast.emit("userStartTyping")
    })
    socket.on("stopTyping",()=>{
        socket.broadcast.emit("userStopTyping")
    })




    socket.on("disconnect", () => {
        console.log("a client disconnected")
    })
})