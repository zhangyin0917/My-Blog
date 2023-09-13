import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Upload } from 'antd'
import { get } from '../../untils/config'

const { token } = get('userInfo')

const props: UploadProps = {
  name: 'files',
  action: `${process.env.REACT_APP_API_URL}/api/rich_coverImg`,
  showUploadList: false,
  headers: {
    authorization: token,
  },
  onChange(info) {
    console.log(info)

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

const CoverImgUpload: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>上传</Button>
  </Upload>
)

export default CoverImgUpload
