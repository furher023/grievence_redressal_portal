var express = require('express');
var router = express.Router();
var query= require('../modules/query');
var session = require('../modules/session');

var db = require('../modules/dbconnect');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.post('/login',(req,res,next)=>{
  query.login({email: req.body.email})
  .then((result)=>{
    console.log(result);
    if(result.passwordHash == req.body.password){
      session.setSession(req, result.firstName, result.email);
      next('/user/dasboard');
    }
    else
      res.send("Wrong password");
  })
  .catch(err => res.send('unsuccesful'+err));
});

router.get('/signup',(req,res)=>{
  res.render('signup');
});
router.post('/signup',async(req,res)=>{
      const userExists = await db.model('user').findOne({email:req.body.email});
      if(userExists)
      {
        return res.status(403).json({
           error : "Email is taken!"
        });
      }
      const User = await new db.model('user')(req.body);
      await User.save();
      res.redirect('/login'); 
});
module.exports = router;
