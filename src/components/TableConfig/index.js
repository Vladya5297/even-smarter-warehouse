import React from 'react'
import { observer } from 'mobx-react-lite'
import { TableConfig as TableConfigView } from './TableConfig'
import { navigationTreeStore } from 'stores/navigationTree'
import { tableStore } from 'stores/table'

export const TableConfig = observer(
  function TableConfigObserver () {
    const currentId = navigationTreeStore.currentId
    const table = tableStore.getTable(currentId)
    const columns = table.getColumns()

    const setColumns = ({ columns }) => {
      table.setColumns(columns)
    }

    return (
    <TableConfigView
      {...{
        columns,
        setColumns
      }}
    />
    )
  }
)
