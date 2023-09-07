var express = require('express')
var router = express.Router()

const tag_handler = require('../dao/tag')
/* GET home page. */
router.get('/getTag', tag_handler.getTag)
router.post('/addBlogTag', tag_handler.addBlogTag)

module.exports = router
