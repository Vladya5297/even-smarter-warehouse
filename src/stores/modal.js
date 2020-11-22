import { makeAutoObservable, autorun } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

class Modal {
  // state
  modals = []

  constructor () {
    makeAutoObservable(this)
  }

  // methods
  add = (modal) => {
    modal.id = uuidv4()
    modal.visible = true
    this.modals.push(modal)
  }

  remove = (id) => {
    this.modals.replace(this.modals.filter((modal) => modal.id !== id))
  }
}

export const modalStore = new Modal()

autorun(() => console.log('modals', modalStore.modals.slice()))
