var express = require('express')
var router = express.Router()

const user_handler = require('../dao/blogType')
/* GET home page. */
router.post('/addBlogType', user_handler.addBlogType)
router.post('/getBlogType', user_handler.getBlogType)
router.post('/deleBlogType', user_handler.deleteBlogType)

module.exports = router
