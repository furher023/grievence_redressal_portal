  
const mongoose = require('mongoose');
var normalize = require ('normalize-mongoose');

//Connecting to the database
const options= {   useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    useCreateIndex: true 
  };

mongoose.connect('mongodb://localhost:27017/sgrp',options,(error)=>{ 
    if(error){
        console.log(error);
    }
    else{
        console.log("Successfully connected to database");
    }
});

const Schema = mongoose.Schema;


// User schema
const user = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    passwordHash:{
        type:String
    },
    role:{
        type:Number,
        default: 0
    },
    rollNo:{
        type:Number
    },
    hostel:{
        type:String
    },
    roomNo:{
        type:String
    },
    phoneNo:{
        type:String
    }
    
});

user.plugin(normalize);
mongoose.model('user',user);

const complaints = new Schema({
    ackNo:{
        type: String
    },
    type:{
        type: Number
    },
    subject:{
        type: String,
        unique: true
    },
    body:{
        type:String
    },
    proof:{
        type:String
    },
    anonymous:{
        type:Boolean,
        default: false
    },
    rollNo:{
        type:Number
    }
    
});

complaints.plugin(normalize);
mongoose.model('complaints',complaints);


module.exports = mongoose;