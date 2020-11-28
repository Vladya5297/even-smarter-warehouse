import { makeAutoObservable, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { rootId } from 'constants/rootId'

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

  deleteNodes (ids) {
    const idsArray = Array.isArray(ids) ? [...ids] : [ids]
    idsArray.forEach(id => {
      this.nodes.delete(id)
    })
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

  getRelatedIds = (ids) => {
    if (ids) {
      const idsArray = Array.isArray(ids) ? [...ids] : [ids]
      const relatedIds = [...idsArray]
      idsArray.forEach(id => {
        relatedIds.push(...this._getChildren(id))
      })
      return relatedIds
    } else {
      return Array.from(this.nodes.keys())
    }
  }

  _getChildren (id) {
    const nodes = []
    this.nodes.forEach(node => {
      if (node.parentId === id) {
        nodes.push(node.id, ...this._getChildren(node.id))
      }
    })
    return nodes
  }
}

export const navigationTreeStore = new NavigationTree()
