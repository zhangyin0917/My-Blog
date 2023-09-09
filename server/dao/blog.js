const { db } = require('../db/index')

// 增加博客
exports.addBlog = (req, res) => {
  const addBlog = req.body
  console.log(addBlog)
  const str = 'insert into t_blog set ?'
  const blog = {
    blog_title: addBlog.title,
    blog_content: addBlog.markDownValue,
    blog_status: 0,
    cover_image: addBlog.coverImg,
    userid: 4,
    type_id: addBlog.categrateValue,
  }

  db.query(str, blog, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('发布失败，请重试！')
    }
    // 获取新插入的博客id
    const newBlogId = results.insertId
    // 获取前端传过来的标签id数组
    const tags = addBlog.tags
    // 创建包含标签id和博客id的数据数组
    const tagBlogData = tags.map(tagid => ({
      tag_id: tagid,
      blog_id: newBlogId,
    }))
    // 插入标签和博客关联数据
    const insetTagBlogQuery = 'insert into t_tag_blog (tag_id, blog_id) VALUES ?'
    db.query(insetTagBlogQuery, [tagBlogData.map(item => [item.tag_id, item.blog_id])], (err, result) => {
      if (err) {
        return res.cc(err)
      }
      return res.cc('发布成功', 0)
    })
  })
}

// 获取所有博客
exports.getBlog = (req, res) => {
  const sqlstr = 'select blog_id, blog_status, cover_image,blog_title FROM t_blog'
  db.query(sqlstr, (err, results) => {
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

// 获取博客详情页内容
exports.getBlogById = (req, res) => {
  const blogId = req.query.id // 获取 URL 中的参数，即博客的 ID
  const sqlstr = 'select * from t_blog where blog_id = ?'
  db.query(sqlstr, [blogId], async (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0) {
      const blogDetail = results[0]
      // 查询类型信息
      const getTypeInfo = async () => {
        const typeSql = 'SELECT * FROM t_blogtype WHERE type_id = ?'
        return new Promise((resolve, reject) => {
          db.query(typeSql, [blogDetail.type_id], (typeErr, typeResults) => {
            if (typeErr) {
              reject(typeErr)
            } else {
              resolve(typeResults[0])
            }
          })
        })
      }
      // 查询用户信息
      const getUserInfo = async () => {
        const userSql = 'SELECT * FROM t_user WHERE userId = ?'
        return new Promise((resolve, reject) => {
          db.query(userSql, [blogDetail.userid], (userErr, userResults) => {
            if (userErr) {
              reject(userErr)
            } else {
              resolve(userResults[0])
            }
          })
        })
      }

      try {
        const [typeInfo, userInfo] = await Promise.all([getTypeInfo(), getUserInfo()])
        res.send({
          status: 0,
          message: 'success',
          data: {
            ...blogDetail,
            typeInfo,
            userInfo,
          },
        })
      } catch (fetchErr) {
        res.send({
          status: 0,
          message: 'success',
          data: blogDetail,
        })
      }
    } else {
      res.send({
        status: 1,
        message: 'No blog found with the given ID',
      })
    }
  })
}

//修改博客

exports.updateBlog = (req, res) => {
  const updateBlog = req.body
  const sqlstrs = 'update t_blog set blog_title= ?,blog_content=?,blog_status=?,cover_image=? where blog_id =? '
  const blog = [
    updateBlog.blogtitle,
    updateBlog.blogcontent,
    updateBlog.blogstatus,
    updateBlog.coverimage,
    updateBlog.id,
  ]
  db.query(sqlstrs, blog, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      res.cc('success')
    }
  })
}
