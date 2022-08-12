const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

const User = require("./models/users")

const userRouter = require("./routes/users")

const app = express();

require('dotenv').config()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//session
app.use(session({
    secret:"My Secret Key",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//mongoose connection
mongoose.connect("mongodb://localhost:27017/API_PROJECT").then(()=>console.log("Database connection established"));

//passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/users',userRouter);


app.listen(process.env.PORT||7000,()=>console.log(`server started on PORT : ${process.env.PORT}`));