import React from 'react'

const sameName = (name) => (
  <span>A file or folder with the name <strong>{name}</strong> already exists in destination folder.</span>
)

export const alertMessage = {
  sameName,
  wrongTarget: 'You are trying to move the selected folder to itself'
}

export const tooltipTitle = {
  addSpreadsheet: 'Add new spreadsheet',
  addFolder: 'Add new folder',
  collapseAll: 'Collapse all folders',
  expandAll: 'Expand all folders'
}
