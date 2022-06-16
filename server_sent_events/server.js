const app = require('express')();
const port = process.env.PORT || 8080
const server = process.env.SERVER_NAME || "admin"

app.get("/", ( req, res )=>{
    res.send("Server root")
} )

app.get("/stream", ( req, res ) =>{
    res.setHeader(
        "Content-Type", "text/event-stream"
    )
    periodic_fn(res);
})

function periodic_fn(res){
    res.send(`SSE Event - ${Date.now()}`)
    setTimeout( periodic_fn(res), 3000)
}

app.listen(port, ()=> console.log(`Server listening on ${port}`))