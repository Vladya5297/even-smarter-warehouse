import React, { useEffect } from 'react'
import classes from './Alert.module.css'
import {
  Alert as AntAlert,
  Button,
  message as antMessage
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export const Alert = ({
  topAlerts,
  bottomAlerts,
  removeAlert
}) => {
  useEffect(() => {
    topAlerts.forEach(({ id, message, type, closable = true, timeout = 3000 }) => {
      let content = message
      if (closable) {
        content = (
          <span>
            {message}
            <span className={classes.close}>
              <Button
                type='text'
                size='small'
                icon={<CloseOutlined />}
                onClick={() => {
                  antMessage.destroy(id)
                  removeAlert(id)
                }}
              />
            </span>
          </span>
        )
      }

      antMessage[type]({
        key: id,
        content,
        duration: timeout / 1000
      })
      setTimeout(() => removeAlert(id), timeout)
    })
  })

  return (
    <div className={classes.alert}>
      {bottomAlerts.map(({ id, message, type, closable = true, timeout = 3000 }) => {
        timeout && setTimeout(() => removeAlert(id), timeout)
        return <AntAlert
          key={id}
          message={message}
          type={type}
          closable={closable}
          onClose={() => removeAlert(id)}
          showIcon
        />
      })}
    </div>
  )
}
