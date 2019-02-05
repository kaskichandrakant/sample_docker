const {Client} = require('pg');

const defaultCs = `postgres://localhost:5432/postgres`;
const connectionString = process.env.DATABASE_URL||defaultCs;
const client = new Client(connectionString)
client.connect()


const add_user = function(userName){
    client.query("SET search_path to sample_user;");
    const insertQuery = {
        text:"INSERT INTO users VALUES($1);",
        values: [userName]
        }
    client.query(insertQuery,(err,res)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('user successfully created');
    });
}

const getUser = function(req,res){
    client.query("SET search_path to sample_user;");
    client.query("select * from users;",(err,data)=>{
        if(data){
            res.send(data.rows)
            return;
        }
        console.log(err);
        res.send("not able to fetch")
    })
}
module.exports = {
    add_user,
    getUser
}

