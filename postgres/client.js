const {Client} = require('pg')
const express = require('express')
app = express()

app.get("/", async (req, res)=>{
    const from = new Date();

    const client = new Client({
        "host" : "localhost",
        "port" : 5432,
        "user" : "postgres",
        "passowrd" : "postgres",
        "database" : "mydb"
    })

    await client.connect();
    const result = await client.query("SELECT * FROM EMPLOYEES");
    console.table(result.rows);
    client.end();

    const to = new Date();
    const duration = to.getTime() - from.getTime();

    res.send({
        "rows" : result.rows,
        "Time taken" : duration
    });

    app.listen(2015, ()=>{
        console.log("Listening on port 2015");
    })

})

app.listen 
