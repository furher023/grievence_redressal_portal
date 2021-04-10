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
  storage: storage,
  limits: {
    fileSize: 10000000
  }
 });

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

router.get('/complaint/:id',(req,res)=>{ // show complaint by id (redirect on this route)
    console.log(req.params.id);
    db.model('complaints').findOne({ackNo:req.params.id},(err,resu)=>{
      if(err)
      throw err; 
      console.log(resu);
       res.render('users/complaint',{resu});  
    });
    
});

// router.get('/complaints',(req,res) =>{   // show user based complaints for dashboard
     
//     res.render('users/complaints');
// });

router.post('/complaint', upload.array('proof', 5), (req,res)=>{   // post complaint
     
    var reg = '/jpeg|jpg|gif|png|avi|mkv|mp4|mp3/';
    try{
      if(req.file)
      if (!reg.match(path.extname(req.file.originalname).toLowerCase())){
        res.send('Please upload a image or video file!');
      }
      if(req.file)
      req.body.proof = './Uploads/' + req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
      const complain = new db.model('complaints')(req.body);
      complain.save();
      res.json({
        complain : "Successful"
      });
    }
    catch(err){
      res.send('Error');
    }
});

router.post('/forward',(req,res) => {  // roles allowed        -> hostel secretary
                                       // to access this route                                     
});


module.exports = router;
