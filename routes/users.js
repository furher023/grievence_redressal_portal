var express = require('express');
var bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
var db = require('../modules/dbconnect');
var router = express.Router();
var moment = require('moment');

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



router.get('/dashboard',(req,res)=>{
  if(req.session.user == undefined){
    res.redirect('/login');
  }
  else{
    res.render('users/dashboard',{role:req.session.user.role});
  }
});

router.get('/complaint/active',(req,res)=>{ // show complaint by id (redirect on this route)
    console.log(req.params.id);
    db.model('complaints').find({rollNo:req.session.user.rollNo},(err,result)=>{
      if(err)
      throw err; 
      console.log(result);
       res.render('users/complaint',{data: result,moment: moment,active: true, page: 'Active',role:req.session.user.role});  
    });
    
});

router.get('/complaint/resolved',(req,res)=>{ // show complaint by id (redirect on this route)
  console.log(req.params.id);
  db.model('complaints').find({rollNo:req.session.user.rollNo},(err,result)=>{
    if(err)
    throw err; 
    console.log(result);
     res.render('users/complaint',{data: result,moment: moment, active: false, page: 'Resolved',role:req.session.user.role});  
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
          var str = '/Uploads/' + req.files[i].filename;
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

router.get('/review',(req,res)=>{
  if(req.session.user != undefined && req.session.user.role > 0 && req.session.user.role <=2){
    db.model('complaints').find({status:0,hostel:req.session.user.hostel,anonymous:false,type:(req.session.user.role-1)},(err,result)=>{
      for( var i=0;i<result.length;i++){
        if(result[i].proof!= undefined){
        var tem = JSON.parse(result[i].proof)
        //console.log(tem);
        result[i].jp = tem}
      }
      //console.log(result[0].jp);
      if(err) res.send(err);
      else
      res.render('users/review',{role:req.session.user.role,data:result,moment:moment});
    })
    
  }
});

router.post('/forward',(req,res) => {  // roles allowed        -> hostel secretary // to access this route                                     
  
});


module.exports = router;
