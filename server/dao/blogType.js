const { db } = require('../db/index')

//1
// 增加博客类型

exports.addBlogType = (req, res) => {
  const BlogTypeInfo = req.body
  const sqlStr = 'select * from t_blogtype where typeName = ?'
  db.query(sqlStr, BlogTypeInfo.typename, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0 && results.typestate === 0) {
      return res.cc('该类型已添加！')
    }
    const sql = 'insert into t_blogtype set ?'
    db.query(sql, { typeName: BlogTypeInfo.typename }, (err, results) => {
      // console.log(results);
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('类型添加失败')
      }
      return res.cc('类型添加成功', 0)
    })
  })
}

// 查看博客类型

exports.getBlogType = (req, res) => {
  const sql = 'select * from t_blogtype'
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length >= 0) {
      res.send({
        status: 0,
        massage: 'success',
        data: results || [],
      })
    }
  })
}

// 删除博客类型
exports.deleteBlogType = (req, res) => {
  const deletBlogType = req.body
  const stsql = 'update t_blogtype set typeState =? where type_id = ?'

  db.query(stsql, [deletBlogType.typestate, deletBlogType.typename], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: 'success',
    })
  })
}
