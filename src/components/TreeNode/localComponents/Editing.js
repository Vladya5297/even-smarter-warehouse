import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import classes from '../TreeNode.module.css'
import { navigationTreeStore } from 'stores/navigationTree'
import { tooltipTitles } from '../constants'
import { tableStore } from 'stores/table'

const tooltipStyle = {
  maxWidth: '190px',
  marginLeft: '10px'
}

export const Editing = React.memo(function Editing ({
  node
}) {
  const [currentTitle, setCurrentTitle] = useState(node.title)

  const nearbyTitles = node && navigationTreeStore.getNodes()
    .filter(({ id, parentId }) => id !== node.id && parentId === node.parentId)
    .map(({ title }) => title)

  const emptyTitle = !currentTitle.length

  const sameTitle = nearbyTitles.includes(currentTitle)

  const isValidTitle = !emptyTitle && !sameTitle

  const renameNode = ({ title }) => {
    navigationTreeStore.editNode({
      id: node.id,
      editing: false,
      title
    })
  }

  const deleteNode = () => {
    navigationTreeStore.deleteNodes(node.id)
  }

  const setEditing = ({ editing }) => {
    navigationTreeStore.editNode({
      id: node.id,
      editing
    })
  }

  const onEscape = ({ keyCode }) => {
    if (keyCode === 27) {
      if (!node.title) {
        deleteNode()
      } else {
        setEditing({ editing: false })
      }
    }
  }

  const addTable = () => {
    if (!node.isLeaf) return
    const table = tableStore.getTable(node.id)
    !table && tableStore.addTable(node.id)
  }

  return (
    <span className={classes.input}>
      <Input
        value={currentTitle}
        onChange={({ target }) => setCurrentTitle(target.value)}
        onPressEnter={() => {
          if (isValidTitle) {
            renameNode({ title: currentTitle })
            addTable()
          }
        }}
        onKeyDown={onEscape}
        ref={input => input && input.focus()}
      />
      <Tooltip
        title={tooltipTitles.emptyTitle}
        visible={emptyTitle}
        color='var(--antd-wave-shadow-color)'
        placement='bottom'
        overlayStyle={tooltipStyle}
      ><span className={classes.tooltip} />
      </Tooltip>
      <Tooltip
        title={tooltipTitles.sameTitle}
        visible={sameTitle}
        color='var(--antd-wave-shadow-color)'
        placement='bottom'
        overlayStyle={tooltipStyle}
      ><span className={classes.tooltip} />
      </Tooltip>
    </span>
  )
})
