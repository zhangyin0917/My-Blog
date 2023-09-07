import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { useListener } from '../../hooks/useBus'
import instance from '../../untils/axios'
import '../../style/coverImgBox.less'

const CoverImgModel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageData, setImgeData] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null) // 追踪鼠标悬停的图片索引
  const [saveCoverImgFn, setSaveCoverImgFn] = useState<any>()
  const getCoverImage = async () => {
    try {
      const results = await instance.get('/api/getAllCoverImg')
      if (results.data.status === 0) {
        const newArrValue = results.data.data.filter((type: any) => {
          return type.cover_Img_state === 0
        })
        setImgeData(newArrValue)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      getCoverImage()
    }
  }, [isModalOpen])

  useListener('openCoverImgeModel', setCoverImg => {
    setSaveCoverImgFn(() => setCoverImg)
    setIsModalOpen(true)
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleDelete = (index: number) => {}
  const handleSelect = (imgUrl: string) => {
    saveCoverImgFn(imgUrl)
    setIsModalOpen(false)
  }

  const renderCoverImg = () => {
    return imageData.map((item: any, index: number) => {
      return (
        <div className='Image_li' key={index}>
          <img className='image' src={item.cover_Img} alt='封面' />

          <div className='overlay'>
            {/* 在这里添加你的删除或选择按钮 */}
            <Button danger style={{ marginRight: '10px' }} size='small' onClick={() => handleDelete(index)}>
              删除
            </Button>
            <Button type='primary' size='small' onClick={() => handleSelect(item.cover_Img)}>
              选择
            </Button>
          </div>
        </div>
      )
    })
  }
  return (
    <>
      <Modal footer={false} width='800px' title='选择封面' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='cover_img'>{renderCoverImg()}</div>
      </Modal>
    </>
  )
}

export default CoverImgModel
