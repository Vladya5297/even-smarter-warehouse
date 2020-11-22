import React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { TreeNode as TreeNodeView } from './TreeNode'
import { navigationTreeStore } from 'stores/navigationTree'
import { rootId } from 'constants/rootId'

export const TreeNode = observer(
  function TreeNodeObserver ({ id }) {
    const node = navigationTreeStore.getNode(id)

    const disabled = computed(
      () => Boolean(navigationTreeStore.getNodes().find(({ editing }) => editing))
    ).get()

    const isRootNode = id === rootId

    const clearAllSelected = () => {
      navigationTreeStore.clearAllSelected()
    }

    const setSelected = ({ selected }) => {
      navigationTreeStore.editNode({
        id,
        selected
      })
    }

    const setCurrent = () => {
      navigationTreeStore.setCurrent(id)
    }

    const nodeSelectHandler = (event) => {
      const manySelected = navigationTreeStore.selectedKeys.length > 1
      if (isRootNode) return
      if (event.ctrlKey || event.metaKey) {
        setSelected({ selected: !node.selected || !manySelected })
      } else {
        if (node.selected) return
        clearAllSelected()
        setSelected({ selected: true })
        node.isLeaf && setCurrent()
      }
    }

    return (
      <TreeNodeView
        {...{
          node: { ...node },
          disabled,
          onClick: nodeSelectHandler
        }}
      />
    )
  }
)
