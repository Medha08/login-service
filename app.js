const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const mongoose = require("mongoose");

//Flash Messages
const flash = require("connect-flash");//stores messages in session so require(express-session)
const session = require("express-session");

const passport = require('passport')

const routesHome = require("./routes/index");
const routesUser = require("./routes/user");

const expressLayouts = require("express-ejs-layouts");

//Passport Config

require('./config/passport')(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//Connect To Database

mongoose.connect(db,{ useNewUrlParser: true})
.then(()=>{ console.log("Mongo Db connected ")})
.catch(err => { console.log(err) })

//Static Files
app.use(express.static(__dirname + '/public'));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended: false }))

//Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))

//Passport MiddleWare 
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash

app.use(flash());

//Global Vars

//Adding custom middleware to form global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes Home
app.use("/",routesHome);

//Routes User
app.use("/users",routesUser);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})