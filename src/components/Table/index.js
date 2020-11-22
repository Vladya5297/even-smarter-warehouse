import React from 'react'
import { computed, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Table as TableView } from './Table'
import { navigationTreeStore } from 'stores/navigationTree'
import { tableStore } from 'stores/table'

export const Table = observer(
  function TableObserver () {
    const currentId = navigationTreeStore.currentId

    const currentTable = computed(
      () => tableStore.tables.find(({ id }) => id === currentId)
    ).get()

    return (
      <TableView
        columns={toJS(currentTable.columns)}
        dataSource={toJS(currentTable.dataSource)}
      />
    )
  }
)
