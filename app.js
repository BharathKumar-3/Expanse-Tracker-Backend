//CRUD
//Create - POST
//Read - Get
//Update - Put
//Delete - delete


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = new express();
const Expenses = require('./model/expense');
const cors = require('cors');
app.use(cors);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// const arr=[
//     {
//     id :"1",
//     title :'NewPhone',
//     amount:'90000',
//     Date:"2020-10-01"
// },
// {
//     id :"2",
//     title :'NewLaptop',
//     amount:'70000',
//     Date:"2023-10-24"
// }
// ]

// const payment = [{
//     id:"1",
//     mode:"Cash"
// },
// {
//     id:"2",
//     mode:'UPI'
// }]

// app.get('/api/v1/health', (req,res)=>{
//     res.send("Server is working");
// })

// app.get('/api/v1/expenses',(req,res)=>{
//     res.send({
//         totalExpenses:arr.length,
//         data: arr,
//         paymentData: payment
//     });
// })

// app.get('/api/v1/expenses/:id',(req,res)=>{
//     console.log(req.params.id);
//     for (let i in arr){
//         if(arr[i].id === req.params.id)
//             res.send({data : arr[i], mode : payment[i].mode})
//     }
//     res.send("Not found")
// })

// app.delete('/api/v1/expenses/:id',(req,res)=>{
//     console.log(req.params.id);
//     for (let i in arr){
//         if(arr[i].id === req.params.id)
//         {
//             arr.splice(i,1);
//             payment.splice(i,1);
//             res.send("Deleted");
//         }
//     }
//     res.send("Not found")
// })

// //Post

// app.post('/api/v1/expenses',(req,res)=>{
//     let newId = (parseInt(arr[arr.length-1].id)+1).toString();
//     let newExpense = {
//     id : newId,
//     title : req.body.title,
//     amount : req.body.amount,
//     Date : req.body.Date,
//     }
//     arr.push(newExpense);
//     console.log(arr);
//     res.send(arr);
// })

// //Update - PUT

// app.put('/api/v1/expense/update/:id',(req,res)=>{
//     for(let i =0;i<arr.length;i++)
//     {
//         if(arr[i].id === req.params.id)
//         {
//             if(req.body.title)
//                 arr[i].title = req.body.title;
//             if(req.body.amount)
//                 arr[i].amount = req.body.amount;
//             if(req.body.Date)
//                 arr[i].Date = req.body.Date;
//             res.send("Updated");
//             return;
//         }
//     }
//     res.send("Not Found");
// })

mongoose.connect('mongodb://0.0.0.0:27017/expense-tracker').then(()=>{
    console.log('connected')
})

app.get('/api/v1/expenses',async(req,res,next)=>{
    res.set('Access-Control-Allow-Origin', '*');
    try{
        const expenses = await Expenses.find();
        res.send(expenses);
    }
    catch(err){
        console.log(err);
        res.send("something happended")
    }
})

app.get('/api/v1/expenses/:id',async(req,res,next)=>{
    try{
        
        const expenses = await Expenses.findById(req.params.id);
        if(expenses)
            res.send(expenses);
        res.send("No expense found")
    }
    catch(err){
        console.log(err);
        res.send("Somethinh happended")
    }
})

app.delete('/api/v1/expenses/:id',async(req,res,next)=>{
    try{
        await Expenses.findByIdAndDelete(req.params.id)
        res.send("Deleted");
    } catch(err){
        res.send(err);
    }
})

app.post('/api/v1/expenses',async(req,res,next)=>{
    res.set('Access-Control-Allow-Origin', '*');
    try{
        console.log(req.body);
        await  Expenses.create(JSON.parse(req.body));
        res.send("successfully created");
    }
    catch (err){
        console.log(err);
        res.send('Error Happended');
    }
})

app.listen(8080,() =>{
    console.log('Server is runing');
})