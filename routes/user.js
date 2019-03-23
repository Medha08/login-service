// user/login user/register

const express = require("express")
const router = express.Router();

//Encrypt Password

const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

//Login Page
router.get("/login",(req,res)=>{
    res.render("login")
})

//Register Page
router.get("/register",(req,res)=>{
    res.render("register")
})

//Register Handle

router.post("/register",(req,res)=>{
    const { name, email, password, password2 } = req.body;
    
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg : 'Please fill in all fields'})
    }

    //Check Passwords match
    if(password  !== password2){
        errors.push({ msg: "Passwords don't match" })
    }

    //Check password length
    if(password.length < 6){
        errors.push({msg : "Password should be atleast 6 characters"})
    } 

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //Validations passed
        User.findOne({email: email})
          .then(user => {
              if(user){
                  //user Exists
                  error.push({msg: "Email is already registered" });
                  res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
              }else {
                 const newUser = new User({
                     name : name,
                     email : email,
                     password: password
                 });

                 console.log(newUser);
                 res.send("done") //so it does'nt hang

              }
          })   
    }

   
})

module.exports = router;