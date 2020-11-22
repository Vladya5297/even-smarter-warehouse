import React from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'components/Table'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { Tutorial } from '../Tutorial/Tutorial'
import { navigationTreeStore } from 'stores/navigationTree'
import classes from '../../App.module.css'

export const Content = observer(
  function ContentObserver () {
    const currentPresented = Boolean(navigationTreeStore.current)

    return (
      <>
        {currentPresented
          ? <>
              <div className={classes['breadcrumbs-wrapper']}>
                <Breadcrumbs/>
              </div>
              <div className={classes['table-wrapper']}>
                <Table />
              </div>
            </>
          : <div className={classes['tutorial-wrapper']}>
              <Tutorial pages={[
                { key: 1, content: 'Tutorial' },
                { key: 2, content: 'Template' }
              ]}/>
            </div>
        }
      </>
    )
  }
)
