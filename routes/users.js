var express = require('express');
var bodyParser = require('body-parser');
var db = require('../modules/dbconnect');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/dashboard',(req,res)=>{
  if(req.session.user == undefined){
    res.redirect('/login');
  }
  else{
    res.render('users/dashboard');
  }
});

router.get('/complaint/:id',(req,res)=>{ // show complaint by id
    console.log(req.params.id);
    res.render('users/complaint',{id:req.params.id});
});

router.get('/complaints',(req,res) =>{   // show user based complaints
     
    res.render('users/complaints');
});

router.post('/complaint',(req,res)=>{   // post complaint

});

router.post('/forward',(req,res) => {  // roles allowed        -> hostel secretary
                                       // to access this route                                     
});


module.exports = router;
