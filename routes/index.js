var express = require('express');
var router = express.Router();
var query= require('../modules/query');
var session = require('../modules/session');

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

module.exports = router;
