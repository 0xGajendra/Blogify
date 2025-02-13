const {Router} = require('express');
const router =  Router();
const multer = require('multer');
const path = require('path')
const Blog = require("../models/blog")
const Comment = require("../models/comment")
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
  // Search for Populate in mongoose in gfg
  // The populate() method in Mongoose is used to automatically replace a field in a document with the actual data from a related document.
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({}).populate("createdBy");
  // console.log(comment);
  // console.log(blog.createdBy.profileImage)
  // console.log(blog.coverImage)
  // console.log(comment[0].createdBy.fullName);
  router.use(express.static(path.resolve("./public")))
  return res.render('blog',{
    user: req.user,
    blog,
    comments,
  })
})

//comment on a perticular blog route

router.post('/comment/:blogId',async (req,res)=>{
  const comments = await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`)
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