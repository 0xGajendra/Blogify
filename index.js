const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const path = require('path');
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog')
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))) // Serves static files (HTML, CSS, JS, images) from the "public" folder 
mongoose.connect("mongodb://127.0.0.1:27017/Blogify")

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    allBlogs.forEach(blog => {
        console.log(blog.coverImage);
        
    });
    res.render('home',{
        user: req.user,
        blogs: allBlogs //bydefault we are sending user with request(which will be null initially)
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});