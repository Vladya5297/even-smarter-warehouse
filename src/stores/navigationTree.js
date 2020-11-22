import { makeAutoObservable, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { rootId } from 'constants/rootId'

function deleteNodes (nodes, ids) {
  const nodesToDelete = [...ids]
  while (nodesToDelete.length) {
    const id = nodesToDelete.shift()
    nodes.forEach(node => {
      if (node.parentId === id) {
        nodesToDelete.push(node.id)
      }
    })
    nodes.delete(id)
  }
}

class NavigationTree {
  // state
  nodes = new Map([
    [0, {
      id: 0,
      title: 'File storage',
      isLeaf: false,
      expanded: true
    }]
  ])

  currentId = ''

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  addNode = (node) => {
    const id = uuidv4()
    node.id = id
    this.nodes.set(id, node)
  }

  deleteNode = (id) => {
    deleteNodes(this.nodes, [id])
  }

  editNode = (data) => {
    const node = this.nodes.get(data.id)
    Object.assign(node, data)
  }

  clearAllSelected = () => {
    this.nodes.forEach(node => {
      node.selected = false
    })
  }

  editAllSelected = (data) => {
    this.nodes.forEach(node => {
      node.selected && Object.assign(node, data)
    })
  }

  deleteAllSelected = () => {
    const ids = []
    this.nodes.forEach(node => {
      node.selected && ids.push(node.id)
    })
    deleteNodes(this.nodes, ids)
  }

  setExpandedAll = (expanded) => {
    this.nodes.forEach(node => {
      if (!node.isLeaf && node.id !== rootId) {
        node.expanded = expanded
      }
    })
  }

  setCurrent = (id) => {
    this.currentId = id
  }

  // computed
  get current () {
    const node = this.nodes.get(this.currentId)
    console.log('title', node && node.title)
    return node
  }

  get selectedKeys () {
    const ids = []
    this.nodes.forEach(node => {
      node.selected && ids.push(node.id)
    })
    return ids
  }

  get expandedKeys () {
    const ids = []
    this.nodes.forEach(node => {
      node.expanded && ids.push(node.id)
    })
    return ids
  }

  getNode = (id) => {
    return this.nodes.get(id)
  }

  getNodes = () => {
    return Array.from(toJS(this.nodes).values())
  }
}

export const navigationTreeStore = new NavigationTree()
