import React from 'react'
import { Button, Tooltip } from 'antd'
import {
  FileAddOutlined,
  FolderAddOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons'
import { tooltipTitle } from '../constants'
import classes from './ButtonsSet.module.css'
import { navigationTreeStore } from 'stores/navigationTree'
import { rootId } from 'constants/rootId'

function ButtonsSetItem ({
  item: {
    tooltipTitle,
    icon,
    onClick
  }
}) {
  return (
    <Tooltip
      title={tooltipTitle}
      placement={'bottom'}
      mouseEnterDelay={0.5}
    >
      <Button
        icon={icon}
        onClick={onClick}
        type='text'
        size='small'
      />
    </Tooltip>
  )
}

export const ButtonsSet = React.memo(({ visible }) => {
  const addNode = ({ isLeaf, parentId }) => {
    navigationTreeStore.editNode({
      id: rootId,
      expanded: true
    })
    navigationTreeStore.editNode({
      id: parentId,
      expanded: true
    })
    navigationTreeStore.addNode({
      parentId,
      title: '',
      editing: true,
      isLeaf
    })
  }

  const collapseAll = () => {
    navigationTreeStore.setExpandedAll(false)
  }

  const expandAll = () => {
    navigationTreeStore.setExpandedAll(true)
  }

  const addNodeToSelected = (isLeaf) => {
    const nodes = navigationTreeStore.getNodes()
    const selectedNodes = nodes.filter(({ selected }) => selected)
    const current = navigationTreeStore.current

    let parentId = rootId
    if (selectedNodes.length === 1) {
      const selectedNode = selectedNodes[0]
      if (!selectedNode.isLeaf) {
        parentId = selectedNode.id
      } else {
        parentId = selectedNode.parentId
      }
    } else if (selectedNodes.length > 1 && current !== undefined) {
      parentId = current.parentId
    }
    addNode({ isLeaf, parentId })
  }

  const items = [
    {
      key: 1,
      icon: <FileAddOutlined />,
      onClick: () => addNodeToSelected(true),
      tooltipTitle: tooltipTitle.addSpreadsheet
    },
    {
      key: 2,
      icon: <FolderAddOutlined />,
      onClick: () => addNodeToSelected(false),
      tooltipTitle: tooltipTitle.addFolder
    },
    {
      key: 3,
      icon: <FullscreenExitOutlined />,
      onClick: collapseAll,
      tooltipTitle: tooltipTitle.collapseAll
    },
    {
      key: 4,
      icon: <FullscreenOutlined />,
      onClick: expandAll,
      tooltipTitle: tooltipTitle.expandAll
    }
  ]

  return (
    <>
      {visible &&
      <div className={classes['buttons-set']}>
        <div>
          {items.map((item) => (
            <ButtonsSetItem
              key={item.key}
              item={item}
            />
          ))}
        </div>
      </div>}
    </>
  )
})
