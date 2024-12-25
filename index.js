const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const path = require('path');
const userRoute = require("./routes/user")
const mongoose = require("mongoose")

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : false}));

mongoose.connect("mongodb://127.0.0.1:27017/Blogify")

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user',userRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});