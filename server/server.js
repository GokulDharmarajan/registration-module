const express = require('express');
const mysql = require('mysql');
const cors=require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'Dream@123',
  database: 'registration'
});
connection.connect();

//get all data
app.get('/getalldata',(req,res)=>{
    connection.query('SELECT id,username,useremail,userpassword,isverified,isactive FROM usertable',(err,results)=>{
        if(err){
            console.log(err);

        }
        res.json(results)
    })
})
//get userdetails by id
app.get('/getalldata/:useremail',(req,res)=>{
    connection.query('SELECT id,useremail,userpassword,isverified,isActive FROM signup where useremail=?',[req.params.useremail],(err,results)=>{
        if(err){
            console.log(err);
        }
        res.json(results)
    })
})
//insert new user
app.post('/newuser',(req,res)=>{
    let {username,useremail,userpassword}=req.body;
    let sql="SELECT id,username,useremail,userpassword,isverified,isactive FROM usertable where useremail=?";
    connection.query(sql,[useremail],(err,results)=>{
        if(err){
            console.log(err);
        }        
        else if(results.length>0){
            console.log(results.length);
            console.log(results?.[0].isverified);
            if(results?.[0].isverified==0){
                sendVerificationMail()
            }
            else{
                console.log("something went wrong");
            }
        }
        else{

            let sql='insert into usertable (username,useremail,userpassword) values (?,?,?)'
            connection.query(sql,[username,useremail,userpassword],(err,results)=>{
                if(err){
                    console.log(err);
                }
                res.json(results)
            })
        }

    })
})
//verification mail send function
sendVerificationMail(){
    
}


app.listen(3000)