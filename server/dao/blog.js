const {db}  = require('../db/index')


// 增加博客
exports.addBlog = (req,res) =>{
  const addBlog = req.body
   const str = 'insert into t_blog set ?'
    const blog = {
        blog_title: addBlog.blogtitle,
        blog_content:addBlog.blogcontent,
        blog_status: addBlog.blogstatus,
        cover_image: addBlog.coverimage,
        userid: addBlog.userId,
        type_id: addBlog.typeId
    }

    db.query(str,blog,(err,results)=>{
         if(err){
            return res.cc(err)
         }
         if (results.affectedRows !== 1) {
            return res.cc("发布失败，请重试！")
        }
         console.log(results);
         return res.cc('发布成功',0)
    })

}


// 获取博客

exports.getBlog = (req,res)=>{
    const sqlstr = 'select * from t_blog'
    db.query(sqlstr,(err,results)=>{
        if(err){
            return res.cc(err)
        }

        if(results.length > 0){
            res.send({
                status:0,
                message:'success',
                data:results
            })
        }
    })

}

//修改博客

exports.updateBlog = (req,res)=>{
    const updateBlog = req.body
    const sqlstrs =  "update t_blog set blog_title= ?,blog_content=?,blog_status=?,cover_image=? where blog_id =? "
    const blog = [updateBlog.blogtitle,updateBlog.blogcontent,updateBlog.blogstatus,updateBlog.coverimage,updateBlog.id]
    db.query(sqlstrs, blog,(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows === 1 ) {
            res.cc('success')
        }
    })

}

