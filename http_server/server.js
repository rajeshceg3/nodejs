const http = require('http')
let PORT = process.argv[2] | 8080

const httpserver = http.createServer()
httpserver.listen(PORT, ()=> console.log(`Server listening on ${PORT}`))

httpserver.on("request", (req, res)=>{
    res.writeHead(200, "ok", {"Content-Type": "text/plain"})
})

httpserver.on("connection", ()=> console.log(" Client is connected"))
