const { db } = require('../db/index')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const config = require('../config')
const svgCaptcha = require('svg-captcha')
// 注册接口
exports.reqUser = (req, res) => {
  const userInfo = req.body
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
        superuser: userInfo.superuser,
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
  console.log(userInfos)
  if (userInfos.captcha !== result) {
    return res.cc('验证码错误！')
  }
  const sql = 'select * from t_user where username = ?'
  db.query(sql, userInfos.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登陆失败')
    //    解密
    const compareResult = bcrypt.compareSync(userInfos.password, results[0].password)
    if (!compareResult) return res.cc('登录失败')
    const user = { username: results[0].usename, password: '' }
    console.log(user)
    const tokenStr = jsonwebtoken.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    })
    return res.send({
      status: 0,
      message: '登录成功',
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
    height: 32,
    fontSize: 50,
    ignoreChars: '0o1LiO',
    noise: '3',
    color: true,
    background: '#ff9999',
  })

  req.session = captcha.text.toLowerCase()

  result = req.session
  res.setHeader('Content-Type', 'image/svg+xml')
  if (captcha) {
    return res.send({
      status: 0,
      message: 'success',
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
