const { db } = require('../db')

// 添加博客标签
exports.addBlogTag = (req, res) => {
  const { tag_name } = req.body
  const sql = 'select * from t_tag where tag_name = ?'
  db.query(sql, tag_name, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.length > 0) {
      return res.cc('该标签已添加')
    }
    const sqlStr = 'insert into t_tag set ?'
    db.query(sqlStr, { tag_name: tag_name }, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('类型添加失败')
      }
      return res.cc('标签添加成功', 0)
    })
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
