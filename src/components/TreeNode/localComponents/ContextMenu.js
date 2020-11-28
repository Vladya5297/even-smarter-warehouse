import React from 'react'
import { Menu } from 'antd'
import { contextMenu, modalTitle, confirmationText } from '../constants'
import { rootId } from 'constants/rootId'
import { navigationTreeStore } from 'stores/navigationTree'
import { modalStore } from 'stores/modal'
import { tableStore } from 'stores/table'

export const ContextMenu = ({ node }) => {
  const items = []

  const manySelected = navigationTreeStore.selectedKeys.length > 1

  const hasChildren = Boolean(navigationTreeStore.getNodes().filter(({ parentId }) => parentId === node.id).length)

  const addNode = ({ isLeaf }) => {
    navigationTreeStore.editNode({
      id: rootId,
      expanded: true
    })
    navigationTreeStore.editNode({
      id: node.id,
      expanded: true
    })
    navigationTreeStore.addNode({
      parentId: node.id,
      title: '',
      editing: true,
      isLeaf
    })
  }

  const setEditing = () => {
    navigationTreeStore.editNode({
      id: node.id,
      editing: true
    })
  }

  const deleteNode = () => {
    const ids = navigationTreeStore.getRelatedIds(node.id)
    tableStore.deleteTables(ids)
    navigationTreeStore.deleteNodes(ids)
  }

  const deleteAllSelected = () => {
    const selectedKeys = navigationTreeStore.selectedKeys
    const ids = navigationTreeStore.getRelatedIds(selectedKeys)
    tableStore.deleteTables(ids)
    navigationTreeStore.deleteNodes(ids)
  }

  const addModal = (modal) => {
    modalStore.add(modal)
  }

  if (!node.isLeaf) {
    items.push({
      key: 1,
      onClick: () => {
        addNode({ isLeaf: true })
      },
      title: contextMenu.newSpreadsheet
    })
    items.push({
      key: 2,
      onClick: () => {
        addNode({ isLeaf: false })
      },
      title: contextMenu.newFolder
    })
  }

  const isRootNode = node.id === rootId
  if (!isRootNode) {
    items.push({
      key: 3,
      onClick: () => {
        setEditing()
      },
      title: contextMenu.rename
    })
    items.push({
      key: 4,
      onClick: () => {
        if (manySelected) {
          addModal({
            title: modalTitle,
            description: confirmationText.manySelected,
            onOk: deleteAllSelected
          })
        } else if (hasChildren) {
          addModal({
            title: modalTitle,
            description: confirmationText.hasChildren,
            onOk: deleteNode
          })
        } else {
          deleteNode()
        }
      },
      title: contextMenu.delete
    })
  }

  return (
    <Menu onClick={(e) => { e.domEvent.stopPropagation() }}>
      {
        items.map(({ key, onClick, title }) => (
            <Menu.Item key={key} onClick={onClick}>
              {title}
            </Menu.Item>)
        )
      }
    </Menu>
  )
}
