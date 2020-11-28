import React from 'react'
import { Button } from 'antd'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { tableStore } from 'stores/table'
import { drawerStore } from 'stores/drawer'
import { navigationTreeStore } from 'stores/navigationTree'
import * as drawer from 'constants/drawer'
import classes from './Title.module.css'
import { TableConfig } from 'components/TableConfig'

export const Title = observer(
  function TitleObserver () {
    const currentId = navigationTreeStore.currentId
    const table = tableStore.getTable(currentId)
    const hasColumns = computed(
      () => Boolean(table.getColumns().length)
    ).get()

    const addRow = () => {
      table.addRow()
    }

    const addDrawer = () => {
      drawerStore.add({
        size: drawer.size.small,
        title: 'Configure table',
        content: <TableConfig />
      })
    }

    return (
      <div className={classes['title-wrapper']}>
        <div>
          <Button
            type='primary'
            size='large'
            onClick={addRow}
            disabled={!hasColumns}
          >Add</Button>
          <Button
            type='primary'
            size='large'
          >Edit</Button>
          <Button
            type='primary'
            size='large'
          >Delete</Button>
        </div>
        <div>
          <Button
            type='primary'
            size='large'
            onClick={addDrawer}
          >Edit table</Button>
        </div>
      </div>
    )
  }
)
