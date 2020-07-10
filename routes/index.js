var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('signup', function(req, res){
  res.render('signup', {title:"sign up"});
});


module.exports = router;
