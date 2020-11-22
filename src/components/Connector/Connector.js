import React from 'react'
import { App } from 'components/App'
import { ThemeProvider } from 'components/ThemeProvider'

export default function Connector () {
  return (
    <>
      <ThemeProvider />
      <App />
    </>
  )
}
