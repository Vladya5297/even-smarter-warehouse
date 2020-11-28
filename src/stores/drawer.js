import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

class Drawer {
  // state
  drawers = []

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  add = (drawer) => {
    drawer.id = uuidv4()
    this.drawers.push(drawer)
  }

  remove = (id) => {
    this.drawers.replace(this.drawers.filter((drawer) => drawer.id !== id))
  }
}

export const drawerStore = new Drawer()
