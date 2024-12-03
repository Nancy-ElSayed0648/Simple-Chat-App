const socket = io('http://localhost:3000')

let chatInput = document.getElementById("chatInput")
let messages = document.getElementById("messages")
function sendMsg(){
    socket.emit("chatMsg" ,chatInput.value)
    chatInput.value = ""
}

socket.on("reply",(msg)=>{
    var item = document.createElement("li") // <li>
    item.textContent = msg //li content
    messages.appendChild(item) // append li to ul
    window.scrollTo(0, document.body.scrollHeight);
})


chatInput.addEventListener("input",()=>{
    socket.emit("typing")
})
socket.on("userStartTyping",()=>{
    document.getElementById("typing").innerHTML="typing..."
})

chatInput.addEventListener("keyup",()=>{
    socket.emit("stopTyping")
})

socket.on("userStopTyping",()=>{
    setTimeout(()=>{
        document.getElementById("typing").innerHTML=""
    },1000)
})
