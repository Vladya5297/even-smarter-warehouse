import React from 'react'
import { Modal as AntModal } from 'antd'

export const Modal = ({
  title,
  description,
  closeModal,
  onOk = () => {},
  onCancel = () => {},
  visible = false
}) => {
  return (
    <AntModal
      visible={visible}
      title={title}
      onOk={() => {
        onOk()
        closeModal()
      }}
      onCancel={() => {
        onCancel()
        closeModal()
      }}
      onClick={(e) => { e.domEvent.stopPropagation() }}
    >
      {description}
    </AntModal>
  )
}
