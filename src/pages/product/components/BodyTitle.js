import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import styles from './BodyTitle.less'

const BodyTitle = ({
                       title,
                       buttons,
                     }) => {

 let btns = buttons.map((item,id) => {
    return (
      <Button
       type={item.type}
       key={id}
       style={item.style}
       onClick={item.onClick}
      >{item.text}</Button>
    )
  })

  return(
    <div className={styles.bodyTitle}>
      <span>{title}</span>
      <div style={{'display':'flex','alignItems': 'center'}}>
      {btns}
      </div>
    </div>
  )
}

BodyTitle.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.array,
}

export default BodyTitle
