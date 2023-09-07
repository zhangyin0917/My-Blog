import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import React from 'react'
import { Image, Space } from 'antd'

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
interface ImageProProps {
  image: string
}

const ImageProview: React.FC<ImageProProps> = ({ image }) => {
  return (
    <>
      {image ? (
        <Image
          width={100}
          style={{ height: '50px' }}
          src={image || src}
          preview={
            {
              toolbarRender: (
                _: any,
                {
                  transform: { scale },
                  actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                }: {
                  transform: { scale: number }
                  actions: {
                    onFlipY: () => void
                    onFlipX: () => void
                    onRotateLeft: () => void
                    onRotateRight: () => void
                    onZoomOut: () => void
                    onZoomIn: () => void
                  }
                }
              ) => (
                <Space size={12} className='toolbar-wrapper'>
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                </Space>
              ),
            } as any
          }
        />
      ) : (
        <PictureOutlined height={100} />
      )}
    </>
  )
}

export default ImageProview
