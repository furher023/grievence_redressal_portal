var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

express().use(bodyParser.urlencoded({ extended: true }));
express().use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',(req,res)=>{
  res.render('users/login');
});

router.post('/login',(req,res)=>{
  console.log(req.body.email);
  console.log(req.body.pwd);
  res.send('ok');
});

router.get('/dashboard',(req,res)=>{
  res.render('users/dashboard');
});

router.get('/complaint/:id',(req,res)=>{ // show complaint by id
    console.log(req.params.id);
    res.render('users/complaint',{id:req.params.id});
});

router.get('/complaints',(req,res) =>{   // show user based complaints
     
    res.render('users/complaints');
});

router.post('/complaints',(req,res)=>{

});

module.exports = router;
