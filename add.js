const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = new express;
const Expenses = require('./model/expense');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect('mongodb://0.0.0.0:27017/expense-tracker').then(()=>{
    console.log('connected')
})


app.get('/api/v1/expense/health',function(req,res,next){
    res.send("server is running");
})

app.get('/api/v1/expense',async function(req,res,next){
    try{
        const expenses = await Expenses.find();
        res.send(expenses);
    }
    catch(err){
        res.send(err);
    }
})

app.post('/api/v1/expense',async function(req,res,next){
    try{
        console.log(req.body);
        await Expenses.create(req.body);
        res.send("successfully created");
    }
    catch(err){
        res.send(err);
    }
})

app.listen(8080,function(){
    console.log("Server is running")
})