import React from 'react'
import { observer } from 'mobx-react-lite'
import { Drawer as DrawerView } from './Drawer'
import { drawerStore } from 'stores/drawer'

export const Drawer = observer(
  function DrawerObserver () {
    const drawers = drawerStore.drawers
    return (
      <>
        {drawers.map(drawer => (
          <DrawerView
            key={drawer.id}
            title={drawer.title}
            size={drawer.size}
            content={drawer.content}
            onClose={() => drawerStore.remove(drawer.id)}
          />
        ))}
      </>
    )
  }
)
