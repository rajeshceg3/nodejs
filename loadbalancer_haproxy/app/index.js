const app = require('express')();
const appid = process.env.APPID;

app.get("/", (req,res) =>{
    res.send(`Application id is ${appid}, Welcome to app`)
})

app.listen(appid, ()=>{
    console.log(`Instance ${appid} is listening on ${appid}`);
} )