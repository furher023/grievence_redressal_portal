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

router.get('/complaint',(req,res)=>{ // show complaint by id (redirect on this route)
    console.log(req.params.id);
    db.model('complaints').find({rollNo:req.session.user.rollNo},(err,result)=>{
      if(err)
      throw err; 
      console.log(result);
       res.render('users/complaint',{result});  
    });
    
});

// router.get('/complaints',(req,res) =>{   // show user based complaints for dashboard
     
//     res.render('users/complaints');
// });


  

router.post('/complaint', upload.array('proof', 5), (req, res)=>{   // post complaint
     
    var reg = '/jpeg|jpg|gif|png|avi|mkv|mp4|mp3/';
    var obj = {files: []};
    var f = false;
      if(req.files.length > 0){
        for(var i=0;i<req.files.length;i++){
          if (!reg.match(path.extname(req.files[i].filename).toLowerCase())){
            f = true;
            
          }
          var str = req.files[i].destination + req.files[i].filename;
          obj.files.push(str); 
        }
      }

      var strr = JSON.stringify(obj);
      if(req.files.length)
      req.body.proof = strr;
      req.body.rollNo= req.session.user.rollNo;
      req.body.hostel= req.session.user.hostel;

      if(f == false){
        const complain = new db.model('complaints')(req.body);
        complain.save((err)=>{
          if(err) res.send(err);
          else
          res.json({
            complain : "Successful"
          });
        });
      }
      else{
        const complain = new db.model('complaints')(req.body);
        complain.save((err)=>{
          if(err) res.send(err);
          else
          res.json({
            complain : "Successful"
          });
        });
      }
        
      }
  );

router.post('/forward',(req,res) => {  // roles allowed        -> hostel secretary
                                       // to access this route                                     
});


module.exports = router;
