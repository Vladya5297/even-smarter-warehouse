import { prepareTreeData } from './prepareTreeData'

export function createTree (nodes) {
  const mappedNodes = nodes.reduce((obj, node) => {
    obj[node.id] = { ...node, children: [] }
    return obj
  }, {})

  Object.values(mappedNodes).forEach(node => {
    node.key = node.id
    if (node.parentId !== undefined) {
      mappedNodes[node.parentId].children.push(node)
    }
  })

  return prepareTreeData([mappedNodes[0]])
}
