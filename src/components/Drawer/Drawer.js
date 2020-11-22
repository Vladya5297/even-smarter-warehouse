import React from 'react'
import { Drawer as AntDrawer } from 'antd'
import { size as drawerSize } from 'constants/drawer'
import classes from './Drawer.module.css'

export const Drawer = ({
  title,
  size,
  onClose,
  content
}) => {
  return (
    <AntDrawer
      title={title}
      visible={true}
      className={classes[size || drawerSize.small]}
      onClose={onClose}
    >
      { content }
    </AntDrawer>
  )
}
