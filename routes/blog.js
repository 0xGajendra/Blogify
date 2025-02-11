const {Router} = require('express');
const router =  Router();
const multer = require('multer');
const path = require('path')
const Blog = require("../models/blog")
const express = require('express')



router.use(express.static(path.resolve("./public"))) // Serves static files (HTML, CSS, JS, images) from the "public" folder 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`)); //for relative pathing 
      //without path.resolve -> path in cb will be (null, "C:\Users\gajen\Downloads\NodeJS\Blogify\public\uploads\${req.user._id}" )
      //with path.resolve -> path in cb will be (null, `./public/uploads/${req.user._id}` )
    },
    filename: function (req, file, cb) {
      const fileName =  `${Date.now()}-${file.originalname}`
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    })
})

router.get('/:id', async (req,res)=>{
  const blog = await Blog.findById(req.params.id);
  console.log(blog.coverImage)
  return res.render('blog',{
    user: req.user,
    blog,
  })
})

router.post('/add-new', upload.single("coverImage"), async (req,res)=>{
    const {title, body} = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImage: `uploads/${req.file.filename}`
    });
  
    return res.redirect(`/`);
})


module.exports = router;