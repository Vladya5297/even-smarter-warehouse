import React, { useState, useEffect } from 'react'
import { theme } from 'constants/theme'
import classes from './ThemeProvider.module.css'
import { observer } from 'mobx-react-lite'
import { themeStore } from 'stores/theme'

const animation = {
  showLoading: classes['show-loading'],
  hideLoading: classes['hide-loading']
}

const themeMap = {
  [theme.ligth]: `${process.env.PUBLIC_URL}/styles/light-theme.css`,
  [theme.dark]: `${process.env.PUBLIC_URL}/styles/dark-theme.css`
}

const bodyLoading = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
}

export const ThemeProvider = observer(
  function ThemeProviderObserver () {
    const [currentClass, setCurrentClass] = useState('')
    const newTheme = themeStore.theme
    useEffect(() => {
      setCurrentClass(animation.showLoading)
      const body = document.getElementsByTagName('body')[0]
      const bodyDefault = { ...body.style }
      Object.assign(body.style, bodyLoading)

      const linkElement = document.createElement('link')
      Object.assign(linkElement, {
        id: 'theme-styles',
        type: 'text/css',
        rel: 'stylesheet',
        href: themeMap[newTheme],
        onload: () => {
          Object.assign(body.style, bodyDefault)
          setTimeout(() => setCurrentClass(animation.hideLoading), 1000)
        }
      })
      const prevStyle = document.getElementById('theme-styles')
      setTimeout(() => {
        prevStyle && prevStyle.remove()
        document.head.appendChild(linkElement)
      }, 1000)
    }, [newTheme])

    return (
    <div onClick={(event) => event.stopPropagation()}
      className={`${classes['theme-loading']} ${currentClass}`}
      style={{
        backgroundColor: newTheme === theme.ligth ? 'white' : 'black'
      }}>
        <div className={classes.spinner}/>
      </div>
    )
  })
