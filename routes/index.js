var express = require('express');
var router = express.Router();
var query= require('../modules/query');
var session = require('../modules/session');

var db = require('../modules/dbconnect');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user == undefined)
  res.render('index', { loggedIn: false });
  else
  res.render('index', { loggedIn: true });
});

/*Logout*/
router.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err) res.send(err);
    res.redirect('/');
  })
});

/*Login*/
router.get('/login',(req,res)=>{
  if(req.session.user == undefined)
  res.render('login',{loggedIn: false});
  else
  res.redirect('/user/dashboard');
});

router.post('/login',(req,res,next)=>{

  query.login({email: req.body.email})
  .then((result)=>{
    console.log(result);
    if(result.passwordHash == req.body.password){
      session.setSession(req, result.firstName, result.email, result.rollNo, result.hostel, result.role);
      res.redirect('/user/dashboard');
    }
    else
      res.send("Wrong password");
  })
  .catch(err => res.send('unsuccesful'+err));

});

/*Singup*/
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
