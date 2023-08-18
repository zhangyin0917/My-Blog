import React, { useEffect, useState } from 'react'
import instance from '../../../untils/axios'
import '../../../style/article.less'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useNavigate } from 'react-router-dom'
const WebHome: React.FC = () => {
  const [article, setArticle] = useState([])
  const navigate = useNavigate()
  const getArticle = async () => {
    try {
      const Results = await instance.post('/api/getBlog')
      if (Results.data.status === 0) {
        setArticle(Results.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleActrticle = (index: number) => {
    navigate(`/article/${encodeURIComponent(index)}`)
  }

  const renderActicle = () => {
    return article.map((item: any, index: number) => {
      return (
        <li onClick={() => handleActrticle(item.blog_id)} key={index}>
          <img src={item.cover_image} alt='博客封面' />
          <span>{item.blog_title}</span>
        </li>
      )
    })
  }
  useEffect(() => {
    getArticle()
  }, [])
  return (
    <div className='article_box'>
      <div>{renderActicle()}</div>
    </div>
  )
}

export default WebHome
