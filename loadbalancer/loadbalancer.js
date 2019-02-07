const express = require('express');
const request = require('request');
const sync_request = require('sync-request');

const app=express();
const PORT=9000;
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const proxies = ['mera_app','mera_app_2','mera_app_3']
let free_server;
app.post('/health', (req, res) => {
    if (!req.body.is_busy){
        free_server= req.body.name
    }
    res.end()  
})

app.get('*',(req,res)=>{
    console.log(`-------------> running on ${free_server}`);
    console.log(req.url);
    request(`http://${free_server}:8000${req.url}`,(err,response,body)=>{
        res.send(body)
    })
})
app.post('*',(req,res)=>{
    console.log(req.body);
    request.post(`http://${proxies[0]}:8000${req.url}`,{form:req.body},(err,response,body)=>{
        res.end()
    })
})
console.log(`listening at Port ${PORT}`);
app.listen(PORT);