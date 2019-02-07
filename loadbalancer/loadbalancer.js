const express = require('express');
const request = require('request');
const sync_request = require('sync-request');

const app=express();
const PORT=9000;
app.use(express.static('public'));
app.use(express.urlencoded());
const proxies = ['mera_app','mera_app_2','mera_app_3']
let free_server;
setInterval(()=>{
    proxies.forEach((proxy)=>{
        setTimeout(()=>{
            try {
            let res = request(`http://${proxy}:8000/health`,(err,res,body)=>{
                if(res.statusCode == 200){
                    console.log(`Healthy server ${proxy}`);
                    free_server = proxy;
                }
                if(err){
                    console.log('--------->>>',err);
                }
            });
            } catch (error) {
                console.log(`Unhealthy server ${proxy} by error \n ${error}`);
            }
            
            return;
        },5)
    })
},2000)


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