var express = require('express')
var router = express.Router()

const blog_handle = require('../dao/blog')

router.post('/addBlog', blog_handle.addBlog)
router.post('/getBlog', blog_handle.getBlog)
router.post('/updateBlog', blog_handle.updateBlog)
router.get('/getBlogById', blog_handle.getBlogById)

module.exports = router
