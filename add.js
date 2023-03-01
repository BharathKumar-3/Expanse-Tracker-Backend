const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = new express;
const Expenses = require('./model/expense');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://BharathKumar-3:kXlZutYY2omP7tyL@cluster0.fjop0gf.mongodb.net/ExpenseTracker').then(()=>{
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
const port = process.env.PORT || 3000
app.listen(8080,function(){
    console.log("Server is running and http://localhost:"+PORT);
})
