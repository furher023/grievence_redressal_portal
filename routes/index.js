var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.post('/login',(req,res)=>{
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  res.send('ok');
});

module.exports = router;
