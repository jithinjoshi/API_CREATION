const express = require("express");
const passport = require("passport");
const User = require("../models/users");

const router = express.Router();

router.get("/data",function(req,res){
    if(req.isAuthenticated()){
        res.json({success:true,message:"Login successfully.."});
    }else{
        res.json({success:false,message:"wrong username or password"});
    }

})

router.get("/register",function(req,res){
  res.render("register");
})

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username, email, password);
  const users = new User({ email, username });
  User.register(users, password, function (err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Your account could not be registered.Error",
        err,
      });
    } else {
      res.json({ success: true, message: "user registered successfully" });
    }
  });
});

router.get("/login",function(req,res){
  res.render("login");
})

router.post("/login", function (req, res) {
  const users = new User({
    username: req.body.username,
    password: req.body.password,
  });
  if(!users.username){
    res.json({ success: false, message: "please enter username"});
  }else if(!users.password){
    res.json({ success: false, message: "please enter password"});
  }
  else{
    req.login(users,function(err){
        if(err){
            res.json({success: false, message:"user can't login"});
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("data");
            })
        }
      })
  }

  
});


module.exports = router;
