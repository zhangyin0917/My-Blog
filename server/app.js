require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var app = express()
const cors = require('cors')
const joi = require('joi')

const multer = require('multer')
const expressJWT = require('express-jwt')
const SECRET_KEY = 'itheima No1' //与生成的密钥一致
const bodyparse = require('body-parser')

const useRouter = require('./routes/users')
const useRouterBlogType = require('./routes/blogType')
const blogRouter = require('./routes/Blog')
const uploadRouter = require('./routes/uploadRouter')
const BlogTag = require('./routes/blogTag')

const objMutlter = multer({
  dest: './public/images', //定义文件上传的位置
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(objMutlter.any()) //任意类型的文件

app.use(bodyparse.json({ limit: '100mb' }))
app.use(cors())
app.use(bodyparse.urlencoded({ limit: '100mb', extended: false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
app.use(
  expressJWT
    .expressjwt({
      secret: SECRET_KEY,
      algorithms: ['HS256'], //算法解析
    })
    .unless({
      path: ['/api/login', '/api/captcha', '/api/getBlog', '/api/getBlogById'],
    }) //登录页无需校验
)
app.use('/api', useRouter, useRouterBlogType, blogRouter, uploadRouter, BlogTag)

app.use((err, req, res, next) => {
  // if (err instanceof AxiosError && err.response.status === 404) {
  //   return res.status(404).json({
  //     message: 'Not Found',
  //     status: 1,
  //   })
  // }
  // //   return res.static(503).send('No internet connection')
  // // }
  // res.status(500).send('Internal Server Error')
})

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  return res.cc(err)
})

module.exports = app
