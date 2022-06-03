const {Pool} = require('pg')
const express = require('express')
app = express()

const pool = new Pool({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "postgres",
    "database": "mydb",
    "max": 25,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis" : 0
})

app.get("/", (req, res)=>{
    const from = new Date();
    const result = pool.query("SELECT * FROM EMPLOYEES");
    console.table(result.rows);
    const to = new Date();
    duration = to.getTime() - from.getTime();
    res.send({
        "rows": result.rows,
        "Time taken": duration
    });
})

app.listen(9000, ()=>{
    console.log("Listening on Port 9000");
})