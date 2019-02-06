const express = require('express');
const request = require('request');
const app=express();
const PORT=9000;
app.use(express.static('public'));
app.use(express.urlencoded());
const proxies = ['mera_app','mera_app_2','mera_app_3']

app.get('*',(req,res)=>{
    request(`http://${proxies[0]}:8000${req.url}`,(err,response,body)=>{
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