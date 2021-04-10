var express = require('express');
var bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
var db = require('../modules/dbconnect');
var router = express.Router();

express().use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './Uploads/',
  filename: function (req, file, cb) {
   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
 });

 var upload = multer({
  storage: storage
 });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

router.post('/complaint', upload.single('proof'), (req,res)=>{   // post complaint
     
    var reg = '/jpeg|jpg|gif|png/';
    if (!reg.match(path.extname(req.file.originalname).toLowerCase())){
      res.send('Please upload an image!')
    }
    req.body.proof = './Uploads/' + req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
    const complain = new db.model('complaints')(req.body);
    complain.save();
    res.json({
      complain : "Successful"
    });
});

router.post('/forward',(req,res) => {  // roles allowed        -> hostel secretary
                                       // to access this route                                     
});


module.exports = router;
