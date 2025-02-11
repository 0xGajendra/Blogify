const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const path = require('path');
const userRoute = require("./routes/user")
const mongoose = require("mongoose");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

mongoose.connect("mongodb://127.0.0.1:27017/Blogify")

app.get('/', (req, res) => {
    res.render('home',{
        user: req.user, //bydefault we are sending user with request(which will be null initially)
    });
});

app.use('/user',userRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});