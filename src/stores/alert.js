import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

class Alert {
  // state
  alerts = []

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  add = (alert) => {
    alert.id = uuidv4()
    this.alerts.push(alert)
  }

  remove = (id) => {
    this.alerts.replace(this.alerts.filter((alert) => alert.id !== id))
  }
}

export const alertStore = new Alert()
