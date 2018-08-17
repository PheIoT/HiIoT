import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Col } from 'antd'
import styles from './DescriptionList.less'


const Description = ({ term, column, className, children, ...restProps }) => {
  const clsString = classNames(styles.description, className)
  const responsive = {
    1: { xs: 24 },
    2: { xs: 24, sm: 12 },
    3: { xs: 24, sm: 12, md: 8 },
    4: { xs: 24, sm: 12, md: 6 },
  }

  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children !== null &&
      children !== undefined && <div className={styles.detail}>{children}</div>}
    </Col>
  )
}

Description.defaultProps = {
  term: '',
}

Description.propTypes = {
  term: PropTypes.node,
}

export default Description
