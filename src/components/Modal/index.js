import React from 'react'
import { observer } from 'mobx-react-lite'
import { Modal as ModalView } from './Modal'
import { modalStore } from 'stores/modal'

export const Modal = observer(
  function ModalObserver () {
    const modal = modalStore.modals.length ? modalStore.modals[0] : {}
    return (
      <ModalView
        title={modal.title}
        description={modal.description}
        onOk={modal.onOk}
        onCancel={modal.onCancel}
        visible={modal.visible}
        closeModal={() => modalStore.remove(modal.id)}
      />
    )
  }
)
