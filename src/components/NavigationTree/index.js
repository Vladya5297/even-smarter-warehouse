import React from 'react'
import { computed, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { NavigationTree as NavigationTreeView } from './NavigationTree'
import { navigationTreeStore } from 'stores/navigationTree'
import { alertStore } from 'stores/alert'
import { createTree } from './handlers/createTree'
import * as constants from 'constants/alert'
import { alertMessage } from './constants'

export const NavigationTree = observer(
  function NavigationTreeObserver () {
    const nodes = navigationTreeStore.getNodes()

    const disabled = computed(
      () => Boolean(nodes.find(({ editing }) => editing))
    ).get()
    const expandedKeys = navigationTreeStore.expandedKeys
    const selectedKeys = navigationTreeStore.selectedKeys

    const treeData = createTree(
      toJS(nodes)
    )

    const getNode = (id) => {
      return navigationTreeStore.getNode(id)
    }

    const clearAllSelected = navigationTreeStore.clearAllSelected

    const setExpanded = ({ id, expanded }) => {
      navigationTreeStore.editNode({ id, expanded })
    }

    const moveNode = ({ id, parentId }) => {
      navigationTreeStore.editNode({ id, parentId })
    }

    const moveAllSelected = ({ parentId }) => {
      navigationTreeStore.editAllSelected({ parentId })
    }

    const getTitle = ({ id }) => {
      const node = getNode(id)
      return node && node.title
    }

    const isValidDrop = ({ id, parentId }) => {
      const children = nodes.filter(node => node.parentId === parentId)
      const title = getTitle({ id })
      return !children.map(({ title }) => title).includes(title)
    }

    const addAlert = (message) => {
      alertStore.add({
        message,
        position: constants.position.top,
        type: constants.type.warning
      })
    }

    const onDrop = ({ node, dragNode }) => {
      const { key: parentId } = node
      const { key: id } = dragNode
      if (node.isLeaf) return
      // if moved non selected node
      if (!selectedKeys.includes(id)) {
        if (isValidDrop({ id, parentId })) {
          moveNode({ id, parentId })
        } else {
          const title = getTitle({ id })
          addAlert(alertMessage.sameName(title))
        }
      // if moved selected nodes
      } else {
      // wrong target
        if (selectedKeys.includes(parentId)) {
          addAlert(alertMessage.wrongTarget)
        } else {
        // check the correcness of title for each selected node
          let valid = true
          const nodesToMove = [...selectedKeys]
          while (nodesToMove.length && valid) {
            const id = nodesToMove.shift()
            if (!isValidDrop({ id, parentId })) {
              const title = getTitle({ id })
              addAlert(alertMessage.sameName(title))
              valid = false
            }
          }
          valid && moveAllSelected({ parentId })
        }
      }
    }

    return (
      <NavigationTreeView
        {...{
          treeData,
          disabled,
          expandedKeys,
          selectedKeys,
          setExpanded,
          onDrop,
          clearAllSelected
        }}
      />
    )
  }
)
