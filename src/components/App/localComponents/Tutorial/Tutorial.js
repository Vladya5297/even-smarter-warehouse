import React, { useRef, useState } from 'react'
import { Carousel, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import classes from './Tutorial.module.css'

export const Tutorial = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const slider = useRef()

  const prev = () => {
    slider.current.prev()
    setCurrentPage(currentPage - 1)
  }

  const next = () => {
    slider.current.next()
    setCurrentPage(currentPage + 1)
  }

  const onKeyPress = ({ keyCode }) => {
    if (keyCode === 37) {
      prev()
    }
    if (keyCode === 39) {
      next()
    }
  }

  return (
    <div className={classes.wrapper} onKeyPress={onKeyPress}>
      <Carousel dots={{ className: classes.dots }} initialSlide={currentPage} ref={slider}>
        {pages.map(page => <div className={classes['tutorial-page']} key={page.key}>{page.content}</div>)}
      </Carousel>
      <Button
        className={classes['tutorial-button']}
        icon={<LeftOutlined />}
        style={{ left: 0 }}
        size='large'
        onClick={prev}
      />
      <Button
        className={classes['tutorial-button']}
        icon={<RightOutlined />}
        style={{ right: 0 }}
        size='large'
        onClick={next}
      />
    </div>
  )
}
