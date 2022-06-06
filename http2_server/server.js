const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
    "key": fs.readFileSync(private.pem),
    "cert": fs.readFileSync(cert.pem)
})

server.on("stream", (stream, headers) =>{
    stream.respond({
        "content-type":"application/json",
        "status": 200
    })

    stream.end(JSON.stringify({
        "user":"rajesh",
        "id": 587
    }))

})

server.listen(443);
