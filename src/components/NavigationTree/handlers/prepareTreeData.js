import React from 'react'
import { TreeNode } from 'components/TreeNode'

function sortNodes (nodes) {
  const sortFunction = (a, b) => {
    if (a.title < b.title) {
      return -1
    } else if (a.title > b.title) {
      return 1
    } else {
      return 0
    }
  }
  const folders = []
  const leaves = []
  nodes.forEach(node => {
    if (node.isLeaf) {
      leaves.push(node)
    } else {
      folders.push(node)
    }
  })
  return [...folders.sort(sortFunction), ...leaves.sort(sortFunction)]
}

function mapTreeData (treeData) {
  return treeData.map(node => ({
    ...node,
    title: <TreeNode key={node.id} id={node.id} />,
    children: mapTreeData(sortNodes(node.children))
  }))
}

export const prepareTreeData = (treeData) => mapTreeData(treeData)
