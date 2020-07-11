var express = require('express');
var tokenUtil = require('../auth/tokenUtil');
var userModel = require('../models/userModel');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res){
  res.render('signin', {title:"sign up"});
});

router.post('/authenticateUser', async function (req,res) {
  console.log(req.body)
  //check our own database
  const userInfo = await userModel.findUsersByEmail(req.body.email);

  if(userInfo.length === 0||req.body.password!==userInfo[0].password){
    res.end("User info incorrect");
  }
  else{
    const userDataPacket = {
      id:userInfo[0].id,
      email: userInfo[0].email,
      password: userInfo[0].password
    };
    const token = await tokenUtil.generateToken(userDataPacket);
    if(!token){
      res.clearCookie('userToken');
      res.redirect('/signin');
    }else {
      res.clearCookie('userToken');
      res.cookie("userToken", token, {expire: new Date() + 1});
      console.log(token);
      res.end("User Authenticated");
    }
  }
});

router.get('/signUp', function(req, res, next) {
  res.render('signUp',{title:'Express'})
});

router.post('/register', function(req, res){
  const accountInfo = {
    email: req.body.email,
    password: req.body.password
  };

  const db = req.con;
  console.log(db);
  db.query("SELECT * FROM users WHERE email=?", accountInfo.email, function(err, rows){
    if(err) {
      console.log(err);
    }
    else {
      if(rows.length!==0){
        res.send("Same email address found");
      }else {
        db.query("INSERT INTO users SET ?", accountInfo, function (err, rows) {
          if (err) {
            console.log(err)
          } else {

            res.send("Insertion successful")
          }
        });
      }
    }
  });
});

module.exports = router;
