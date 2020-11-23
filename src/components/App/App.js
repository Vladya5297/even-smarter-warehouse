import React from 'react'
import { Layout } from 'antd'
import { NavigationTree } from 'components/NavigationTree'
import { Alert } from 'components/Alert'
import { Modal } from 'components/Modal'
import { Drawer } from 'components/Drawer'
import { ThemeProvider } from 'components/ThemeProvider'
import { Content } from './localComponents/Content/Content'
import classes from './App.module.css'

const { Content: AntContent, Sider } = Layout

export const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={classes['custom-sider']}>
        <NavigationTree />
      </Sider>
      <Layout>
        <AntContent>
          <Content />
        </AntContent>
      </Layout>
      <Alert />
      <Modal />
      <Drawer />
      <ThemeProvider />
    </Layout>
  )
}
