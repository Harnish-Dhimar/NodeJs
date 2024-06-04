const mongoose = require('mongoose');

//schema creating
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age :{
        type : Number
    },
    work:{
        type : String,
        enum : ['chef','waiter','manager'],
        required : true
    },
    mobile:{
        type : String,
        required :  true
    },
    email:{
        type : String,
        unique : true,
        required : true
    }
})

//creatong model
const person = mongoose.model('person',personSchema);
module.exports = person;