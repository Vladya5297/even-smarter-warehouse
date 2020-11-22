import { columnType } from 'constants/table'
import { makeAutoObservable, autorun } from 'mobx'

class Table {
  // state
  tables = []

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  add = (id) => {
    const table = {
      id,
      columns: [],
      dataSource: []
    }
    this.tables.push(table)
  }

  remove = (ids) => {
    let filtered
    if (Array.isArray(ids)) {
      filtered = this.tables.filter((table) => !ids.includes(table.id))
    } else {
      filtered = this.tables.filter((table) => table.id !== ids)
    }
    this.tables.replace(filtered)
  }

  setColumns = (data) => {
    const table = this.tables.find(table => table.id === data.id)
    table.columns = data.columns.map((column) => {
      column.dataIndex = column.id
      return column
    })
  }

  addRow = (id) => {
    const table = this.tables.find(table => table.id === id)
    const newRow = {}
    table.columns.forEach(column => {
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
    table.dataSource.push(newRow)
  }
}

export const tableStore = new Table()

autorun(() => console.log('tables', tableStore.tables.slice()))
