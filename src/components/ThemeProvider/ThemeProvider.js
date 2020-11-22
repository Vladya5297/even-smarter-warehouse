import React, { useState } from 'react'
import { theme } from 'constants/theme'
import classes from './ThemeProvider.module.css'

const display = {
  none: 'none',
  flex: 'flex'
}

const themeMap = {
  [theme.ligth]: `${process.env.PUBLIC_URL}/styles/light-theme.css`,
  [theme.dark]: `${process.env.PUBLIC_URL}/styles/dark-theme.css`
}

export default function ThemeProvider ({ newTheme }) {
  const [currentTheme, setTheme] = useState()
  const [currentStyle, setStyle] = useState({
    display: display.none,
    opacity: 0
  })

  if (newTheme && newTheme !== currentTheme) {
    setTheme(newTheme)
    setStyle({
      display: display.flex,
      opacity: 0
    })
    // it needs to animate opacity
    setTimeout(() => setStyle({
      display: display.flex,
      opacity: 1
    }), 10)

    const linkElement = document.createElement('link')
    Object.assign(linkElement, {
      id: 'theme-styles',
      type: 'text/css',
      rel: 'stylesheet',
      href: themeMap[newTheme],
      onload: () => {
        setStyle({
          display: display.flex,
          opacity: 0
        })
        setTimeout(() => setStyle({
          display: display.none,
          opacity: 0
        }), 1000)
      }
    })

    const prevStyle = document.getElementById('theme-styles')
    setTimeout(() => {
      prevStyle && prevStyle.remove()
      document.head.appendChild(linkElement)
    }, 1000)
  }

  return (
    <div onClick={(event) => event.stopPropagation()}
      className={classes['theme-loading']}
      style={{
        ...currentStyle,
        backgroundColor: newTheme === theme.ligth ? 'white' : 'black'
      }}></div>
  )
}
