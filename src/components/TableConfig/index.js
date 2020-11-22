import React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { TableConfig as TableConfigView } from './TableConfig'
import { navigationTreeStore } from 'stores/navigationTree'
import { tableStore } from 'stores/table'

export const TableConfig = observer(
  function TableConfigObserver () {
    const currentId = navigationTreeStore.currentId

    const columns = computed(
      () => tableStore.tables.find(({ id }) => id === currentId).columns
    ).get()

    const setColumns = ({ columns }) => {
      tableStore.setColumns({ id: currentId, columns })
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
