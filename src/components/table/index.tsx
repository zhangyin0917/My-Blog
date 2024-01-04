import React from 'react'
import { Space, Table, Tag, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import instance from '../../untils/axios'

interface DataType {
  key?: string
  type_id: number
  typeName: string
  typeState?: number
}
interface TableProp {
  data: DataType[]
  onDelete: () => void
}

const TableData: React.FC<TableProp> = ({ data, onDelete }) => {
  const handleDetele = async (record: any) => {
    const result = await instance.post('/api/deleBlogType', {
      typestate: 1,
      typename: record.type_id,
    })
    if (result.data.status === 0) {
      onDelete()
      message.success('已删除')
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'TypeID',
      key: 'type_id',
      dataIndex: 'type_id',
    },
    {
      title: 'TypeName',
      key: 'typeName',
      dataIndex: 'typeName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => (
        <Space size='middle'>
          <a onClick={async () => await handleDetele(record)}>删除</a>
        </Space>
      ),
    },
  ]

  return (
    <Table columns={columns} dataSource={data ? data.map(item => ({ ...item, key: item.type_id.toString() })) : []} />
  )
}

export default TableData
