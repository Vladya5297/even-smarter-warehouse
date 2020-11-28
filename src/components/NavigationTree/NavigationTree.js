import React, { useState } from 'react'
import { Tree } from 'antd'
import { ButtonsSet } from './localComponents/ButtonsSet'
import classes from './NavigationTree.module.css'
const { DirectoryTree } = Tree

export const NavigationTree = ({
  selectedKeys,
  expandedKeys,
  setExpanded,
  disabled,
  treeData,
  onDrop,
  clearAllSelected
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
  }

  const onDropHandler = ({ node, dragNode }) => {
    onDrop({ node, dragNode })
    setIsDragging(false)
  }

  const onExpand = (_, { node }) => {
    !disabled && setExpanded({ id: node.id, expanded: !node.expanded })
  }

  const onDragEnter = ({ node }) => {
    !node.isLeaf && setExpanded({ id: node.id, expanded: true })
  }

  return (
    <>
      <div className={classes['navigation-tree']}>
        <ButtonsSet visible={!disabled && !isDragging} />
        <DirectoryTree
          treeData={treeData}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          disabled={disabled}
          draggable={true}
          onDrop={onDropHandler}
          onDragEnter={onDragEnter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          multiple
        />
      </div>
      <div
        className={classes.outside}
        onClick={clearAllSelected}
      />
    </>
  )
}
