import React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Alert as AlertView } from './Alert'
import { alertStore } from 'stores/alert'
import * as alert from 'constants/alert'

export const Alert = observer(
  function AlertObserver () {
    const topAlerts = computed(
      () => alertStore.alerts.filter(({ position }) => position === alert.position.top)
    ).get()
    const bottomAlerts = computed(
      () => alertStore.alerts.filter(({ position }) => position === alert.position.bottom)
    ).get()
    return (
      <AlertView
        topAlerts={topAlerts}
        bottomAlerts={bottomAlerts}
        removeAlert={alertStore.remove}
      />
    )
  }
)
