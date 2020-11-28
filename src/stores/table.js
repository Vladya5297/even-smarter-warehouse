import { columnType } from 'constants/table'
import { v4 as uuidv4 } from 'uuid'
import { makeAutoObservable, toJS } from 'mobx'

class TableStore {
  // state
  tables = new Map()
  selected = new Set()

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  addTable = (id) => {
    const table = new Table(id)
    this.tables.set(id, table)
  }

  deleteTables = (ids) => {
    ids.forEach(id => {
      this.tables.delete(id)
    })
  }

  // computed
  getTable = (id) => {
    return this.tables.get(id)
  }
}

class Table {
  // state
  id
  columns = []
  dataSource = new Map()
  selectedRows = new Set()

  constructor (id) {
    this.id = id
    makeAutoObservable(this)
  }

  // methods
  setColumns = (columns) => {
    this.columns = columns.map((column) => {
      column.dataIndex = column.id
      return column
    })
  }

  addRow = () => {
    const id = uuidv4()
    const newRow = { key: id }
    this.columns.forEach(column => {
      let value
      switch (column.type) {
        case columnType.string: {
          value = ''
          break
        }
        case columnType.number: {
          value = 0
          break
        }
        case columnType.boolean: {
          value = false
          break
        }
        case columnType.date: {
          value = new Date()
          break
        }
        default:
          break
      }
      newRow[column.dataIndex] = value.toString()
    })
    this.dataSource.set(id, newRow)
  }

  toggleSelected = (id) => {
    const selected = this.selectedRows
    selected.has(id) ? selected.delete(id) : selected.add(id)
  }

  // computed
  getColumns = () => {
    return toJS(this.columns)
  }

  getDataSource = () => {
    return Array.from(toJS(this.dataSource).values())
  }

  get selected () {
    return Array.from(toJS(this.selectedRows).values())
  }
}

export const tableStore = new TableStore()
