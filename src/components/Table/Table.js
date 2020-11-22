import React from 'react'
import { Table as AntTable } from 'antd'
import { Title } from './localComponents/Title/Title'
import classes from './Table.module.css'

export const Table = ({
  columns = [],
  dataSource = []
}) => {
  return (
    <div className={classes['table-wrapper']}>
      <AntTable
        bordered
        size='small'
        columns={columns}
        dataSource={dataSource}
        title={() => <Title />}
        pagination={{
          position: ['none', 'bottomCenter'],
          defaultPageSize: 20,
          pageSizeOptions: [20, 50, 100]
        }}
        scroll={{
          x: '100vw',
          y: '75vh'
        }}
        rowSelection={{
          type: 'checkbox',
          columnWidth: '40px',
          fixed: true
        }}
      />
    </div>
  )
}
