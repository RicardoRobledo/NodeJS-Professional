const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Hola mundo");
});

app.get("/json", (req, res)=>{
    res.json({message:"Hola mundo"})
});

app.post("/request/:id", (req, res)=>{
    const requestObject = {
        body: req.body,
        cookies: req.cookies,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        secure: req.secure,
        contentType: req.get("Content-Type"),
        isJson: req.is("json"),
    }

    res.json(requestObject);
});

app.get("/response", (req, res)=>{
    res.cookie("myCookie", "Hol mundo");
    res.set("Content-Type", "application/json");
    res.status(200).send("Mira los headers y las cookies");
});

app.listen(PORT, ()=>console.log(`El servidor se esta ejecutando en el puerto http://localhost:${PORT}`));