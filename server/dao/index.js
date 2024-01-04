const { db } = require('../db/index')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const config = require('../config')
const svgCaptcha = require('svg-captcha')
const fetchImageAndLog = require('../component/RandomImage')
// 注册接口
exports.reqUser = async (req, res) => {
  const userInfo = req.body
  const images = await fetchImageAndLog()
  console.log(images)
  const sqlStr = 'select * from t_user where username = ? '
  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0) {
      return res.cc('用户名字被占用，请更换其他用户名')
    }

    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    const sql = 'insert into t_user set ?'
    db.query(
      sql,
      {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        avatar: images,
      },
      (err, results) => {
        if (err) {
          return res.cc(err)
        }
        if (results.affectedRows !== 1) {
          return res.cc('用户注册失败，请重试！')
        }

        return res.cc('用户注册成功', 0)
      }
    )
  })
}

// 登录接口
exports.login = (req, res) => {
  const userInfos = req.body
  if (userInfos.captcha.toLowerCase() !== result) {
    return res.cc('验证码错误！')
  }
  const sql = 'select * from t_user where username = ?'
  db.query(sql, userInfos.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('账号或者密码错误')
    //    解密
    const compareResult = bcrypt.compareSync(userInfos.password, results[0].password)
    if (!compareResult) return res.cc('账号或者密码错误')
    const user = { username: results[0].usename, password: '' }
    const tokenStr = jsonwebtoken.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    })
    return res.send({
      status: 0,
      message: '登录成功',
      data: {
        username: results[0].username,
        avatar: results[0].avatar,
        email: results[0].email,
        phone: results[0].phone,
        role: results[0].role,
      },
      token: 'Bearer ' + tokenStr,
    })
  })
}
var result
// 生成验证码
exports.getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    width: 120,
    height: 40,
    fontSize: 50,
    ignoreChars: '0o1LiO',
    noise: '3',
    color: true,
    background: '#cc9966',
  })

  req.session = captcha.text.toLowerCase()
  result = req.session

  if (captcha) {
    return res.send({
      status: 0,
      message: 'success',
      text: captcha.text,
      data: captcha.data,
    })
  }
}

// 获取用户信息
exports.getInfo = (req, res) => {
  const InfoStr = 'select * from t_user'
  db.query(InfoStr, (err, results) => {
    if (err) return res.cc(err)
    if (results.length > 0) {
      const result = { ...results[0], username: '', password: '' }
      res.send({
        status: 0,
        message: 'success',
        data: result,
      })
    }
  })
}
