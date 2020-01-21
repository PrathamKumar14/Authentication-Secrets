
//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){

   /////////////////////////////////// For level 4 salting and hashing bcrypt ////////////////////////////////////////////

   // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
   //    newUser = new User({
   //      email: req.body.username,
   //      password: hash
   //    });
   //
   //    newUser.save(function(err){
   //      if(err){
   //        console.log(err);
   //      } else {
   //          res.render("secrets");
   //      }
   //    });
   // });

  newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  newUser.save(function(err){
    if(err){
      console.log(err);
    } else {
        res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){

  /////////////////////////////////// For level 4 salting and hashing bcrypt ////////////////////////////////////////////

  // const username = req.body.username;
  // const password = req.body.password;
  //
  // User.findOne({email: username}, function(err, foundUser){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     if(foundUser){
  //       bcrypt.compare(password, foundUser.password, function(err, result) {
  //         if(result === true){
  //           res.render("secrets");
  //         }
  //       });
  //     }
  //   }
  // });

  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    } else {
      if(foundUser){
        if(foundUser.password === password){
          res.render("secrets");
        }
      }
    }
  });

});

app.listen(3000, function(req, res){
  console.log("Server started at port 3000");
});
