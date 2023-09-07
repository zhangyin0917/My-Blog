const { db } = require('../db')

// 添加博客标签
exports.addBlogTag = (req, res) => {
  const { tag_id, blog_id } = req.body
  const sqlStr = 'insert into t_tag_blog set ?'
  db.query(sqlStr, { tag_id: tag_id, blog_id: blog_id }, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.affectedRows !== 1) {
      return res.cc('标签添加失败')
    }

    return res.cc('类型添加成功', 0)
  })
}

// 获取所有标签
exports.getTag = (req, res) => {
  const sql = 'select * from t_tag'
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0) {
      res.send({
        status: 0,
        message: 'success',
        data: results,
      })
    }
  })
}
