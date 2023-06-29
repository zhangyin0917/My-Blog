var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const { db } = require('../db')
const PictureUrl = process.env.NODE_ENV
console.log(PictureUrl)
// 文章中图片上传接口
router.post('/rich_editor_upload', async (req, res) => {
  if (!req.files) {
    return res.send({
      errno: 1, // 只要不等于 0 就行
      message: '失败信息',
    })
  }
  let oldName = req.files[0].path
  let newName = req.files[0].path + path.parse(req.files[0].originalname).ext
  fs.renameSync(oldName, newName)

  res.send({
    errno: 0, // 注意：值是数字，不能是字符串
    data: {
      url: PictureUrl + '/images/' + req.files[0].filename + path.parse(req.files[0].originalname).ext, // 图片 src ，必须
      // "alt": "yyy", // 图片描述文字，非必须
      // "href": "zzz" // 图片的链接，非必须
    },
  })
})

// 封面上传接口 记录数据库
router.post('/rich_coverImg', async (req, res) => {
  if (!req.files) {
    res.cc('fail', 1)
  }
  let oldName = req.files[0].path
  let newName = req.files[0].path + path.parse(req.files[0].originalname).ext
  fs.renameSync(oldName, newName)
  const result = PictureUrl + '/images/' + req.files[0].filename + path.parse(req.files[0].originalname).ext
  if (result) {
    const sqls = 'insert into t_coverimg set ?'
    db.query(sqls, { cover_Img: result }, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('上传失败')
      }

      return res.cc('上传成功', 0)
    })
  }
})

// 删除封面图片接口
router.post('/detleCoverImg', async (req, res) => {
  const deleCoverImg = req.body
  const strens = 'update t_coverimg set cover_Img_state = ? where cover_Img_ID = ?'

  db.query(strens, [deleCoverImg.coverstate, deleCoverImg.coverID], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: 'success',
    })
  })
})

// 获取封面所有图片
router.get('/getAllCoverImg', async (req, res) => {
  const substr = 'select * from t_coverimg'

  db.query(substr, (err, results) => {
    if (err) {
      return res.cc(err)
    }

    if (results.length > 0) {
      return res.send({
        status: 0,
        message: '查询成功',
        data: results,
      })
    }
  })
})
module.exports = router
