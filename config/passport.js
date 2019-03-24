const LocalStrategy = require('passport-local').Strategy;

//To check wih the user's existing password
const mongoose = require('mongoose');

//To decrypt or compare  the password stored in Db
const bcrypt = require('bcryptjs');

//Load User Model
const User = require("../models/User");


module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'email'},(email,password,done)=>{
            //Match User
            User.findOne({email : email})
             .then( user => {
                 if(!user){
                    return done(null,false,{ message : "The email is not registered "});
                 }
              //Match password
              bcrypt.compare(password,user.password,(err, isMatch)=>{
                  if(err) throw err;

                  if(isMatch){
                    return done(null,user);
                  }else{
                      return done(null,false,{message:"Password is not Correct!"})
                  }
              });

             })
             .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}