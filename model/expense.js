const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please enter title']
    },
    amount:{
        type:Number,
        required :[true,'Please enter amount']
    },
    Date:{
        type:String
    }
});

module.exports =mongoose.model('Expenses',expenseSchema);