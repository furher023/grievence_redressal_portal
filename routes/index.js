var express = require('express');
var router = express.Router();
var db = require('../modules/dbconnect');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.post('/login',(req,res)=>{
  console.log(req.body.email);
  console.log(req.body.pwd);
  res.send('ok');
});

router.get('/signup',(req,res)=>{
  res.render('signup');
});
router.post('/signup',async(req,res)=>{
      const userExists = await db.user.findOne({email:req.body.email});
      if(userExists)
      {
        return res.status(403).json({
           error : "Email is taken!"
        });
      }
      const User = await new db.user(req.body);
      await User.save();
      res.redirect('/login'); 
});
module.exports = router;
