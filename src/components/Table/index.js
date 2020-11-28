import React from 'react'
import { observer } from 'mobx-react-lite'
import { Table as TableView } from './Table'
import { navigationTreeStore } from 'stores/navigationTree'
import { tableStore } from 'stores/table'

export const Table = observer(
  function TableObserver () {
    const currentId = navigationTreeStore.currentId
    const table = tableStore.getTable(currentId)
    const columns = table.getColumns(currentId)
    const dataSource = table.getDataSource(currentId)
    const onSelect = (record) => {
      table.toggleSelected(record.key)
    }
    const selectedRowKeys = table.selected
    return (
      <TableView
        columns={columns}
        dataSource={dataSource}
        onSelect={onSelect}
        selectedRowKeys={selectedRowKeys}
      />
    )
  }
)
