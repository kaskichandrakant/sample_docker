const express = require('express');
const app = express();
const {
    add_user,
    getUser
} = require('./dbHandler.js');
const PORT = 8000;
app.use(express.static('public'));
app.use(express.urlencoded());
app.listen(PORT);


app.post('/add_user', (req, res) => {
    add_user(req.body.username);
    res.send(req.body);
})
app.get('/users', (req, res) => {
    getUser(req, res);
})
app.get('/health', (req, res) => {
    res.sendStatus(200);
})
app.get('/slow', (req, res) => {
    res.setTimeout(15000,()=>{
        res.send('working now')
    })
})

console.log(`listening at Port ${PORT}`);