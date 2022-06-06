const http = require("http")
const webSocketServer = require("websocket").server

let connection = null;

const httpserver = http.createServer((req,res) => {
    console.log("Server Request received")
})

// Initialize websocket with http server
const websocket = new webSocketServer({
    "httpServer": httpserver
})

httpserver.listen(8080, ()=> {
    console.log("Waiting for requests on 8080")
} )

websocket.on("request", request => {
    connection = request.accept(null, request.origin)
    connection.on("open", ()=> console.log("Connection Opened"))
    connection.on("close", ()=> console.log("Connection Closed"))
    connection.on("message", message =>{
        console.log(`Message received from websocket is ${message.utf8Data}`)
        connection.send(`Message received : ${message.utf8Data}`)
    }
    periodic_fn();

})

function periodic_fn(){
    connection.send("Message added to websocket")
    setTimeout(periodic_fn, 3000)
}

