import React from 'react'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import { observer } from 'mobx-react-lite'
import { rootId } from 'constants/rootId'
import { navigationTreeStore } from 'stores/navigationTree'

export const Breadcrumbs = observer(
  function BreadcrumbsObserver () {
    const current = navigationTreeStore.current

    const getNode = (id) => {
      return navigationTreeStore.getNode(id)
    }

    const loop = (nodeId) => {
      let node = {}
      // if node id provided
      if (nodeId !== undefined) {
        node = getNode(nodeId)
      } else {
        // on initial call trying to find current spreadsheet
        // if there are no - find root node
        node = current || getNode(rootId)
      }
      const result = [{
        id: node.id,
        title: node.title
      }]
      if (node.parentId !== undefined) {
        result.unshift(...loop(node.parentId))
      }
      return result
    }

    const breadcrumbs = loop()

    return (
      <AntBreadcrumb>
        {breadcrumbs.map(({ id, title }) => <AntBreadcrumb.Item key={id}>{title}</AntBreadcrumb.Item>)}
      </AntBreadcrumb>
    )
  }
)
