import { makeAutoObservable } from 'mobx'

class Theme {
  theme = 'light'

  constructor () {
    makeAutoObservable(this)
  }

  toggle = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
}

export const themeStore = new Theme()
