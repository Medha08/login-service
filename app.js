const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const mongoose = require("mongoose");

const routesHome = require("./routes/index");
const routesUser = require("./routes/user");

const expressLayouts = require("express-ejs-layouts");

//DB
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

//Routes Home
app.use("/",routesHome);

//Routes User
app.use("/users",routesUser);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})