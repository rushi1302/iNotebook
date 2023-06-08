const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Helloi world");
})

app.listen(port, () => { console.log("App is listening on port 3000") });