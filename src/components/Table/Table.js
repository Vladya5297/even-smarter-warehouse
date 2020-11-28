import React, { useEffect } from 'react'
import { Table as AntTable } from 'antd'
import { Title } from './localComponents/Title/Title'
import classes from './Table.module.css'

export const Table = ({
  columns = [],
  dataSource = [],
  onSelect,
  selectedRowKeys
}) => {
  const onResize = () => {
    const query = `.${classes['table-wrapper']} .ant-table-content`
    const elem = document.querySelector(query)
    elem.style.maxHeight = `${window.innerHeight - 150}px`
    elem.style.height = 'min-content'
  }
  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
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
          showSizeChanger: true,
          defaultPageSize: 20,
          pageSizeOptions: [20, 50, 100]
        }}
        rowSelection={columns.length && {
          type: 'checkbox',
          columnWidth: '40px',
          fixed: true,
          onSelect: onSelect,
          selectedRowKeys: selectedRowKeys
        }}
      />
    </div>
  )
}
