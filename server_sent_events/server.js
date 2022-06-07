const app = require('express')();

app.get("/", ( req, res )=>{
    res.send("Server root")
} )

app.get("/stream", ( req, res ) =>{
    res.setHeader({
        "Content-Type": "text/event-stream"
    })
    periodic_fn(res)
})

const port = process.env.PORT || 8080
const server = process.env.SERVER_NAME || "admin"

function periodic_fn(res){
    res.write(`SSE Event - ${Date.now()}`)
    setTimeout( periodic_fn, 3000)
}

app.listen(port, ()=> console.log(`Server listening on ${port}`))