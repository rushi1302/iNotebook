const connectToMongo = require('./db');
const express = require('express');
const auth = require('./routes/Auth')
const notes = require('./routes/Notes')

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Helloi world");
})

app.use('/api/auth', auth);
app.use('/api/notes', notes);

app.listen(port, () => { console.log("App is listening on port 5000") });