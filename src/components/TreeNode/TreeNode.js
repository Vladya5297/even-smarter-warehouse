import React from 'react'
import { Dropdown } from 'antd'
import { ContextMenu } from './localComponents/ContextMenu'
import { Editing } from './localComponents/Editing'
import classes from './TreeNode.module.css'

export const TreeNode = ({
  node,
  disabled,
  onClick
}) => {
  return (
    <>
      {!disabled &&
      <Dropdown overlay={ContextMenu({ node })} trigger={['contextMenu']}>
        <span className={classes.dropdown} onClick={onClick} />
      </Dropdown>}
      {node.editing
        ? <Editing node={node} />
        : <span>{node.title}</span>}
    </>
  )
}
