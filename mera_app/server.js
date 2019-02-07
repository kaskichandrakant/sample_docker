const express = require('express');
const request = require('request');
const app = express();
let is_busy = false;
const {add_user,getUser} = require('./dbHandler.js');
const PORT = 8000;
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.listen(PORT);


app.post('/add_user', (req, res) => {
    is_busy = true;
    add_user(req.body.username);
    res.send(req.body);
    is_busy = false;

})
app.get('/users', (req, res) => {
    is_busy = true;
    getUser(req, res);
    is_busy = false;
})
app.get('/slow', (req, res) => {
    is_busy = true;
    let start_time = new Date().getTime()
    let currentTime = new Date().getTime()

    while(currentTime-start_time != 50000){
        currentTime = new Date().getTime()
    }
    is_busy = false;
})

setInterval(() => {
    request.post(`http://${process.env.PROXY_DNS}:9000/health`, {
        form: {
            "name": process.env.DNS_NAME,
            "status":is_busy 
        }
    }, (err, response, body) => {
        console.log(`I am alive ${process.env.DNS_NAME}`);
    })
}, 5000)

console.log(`listening at Port ${PORT}`);