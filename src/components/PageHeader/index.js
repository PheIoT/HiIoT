import React from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import classNames from 'classnames'
import styles from './index.less'


export function getBreadcrumb (breadcrumbNameMap, url) {
  let breadcrumb = breadcrumbNameMap[url]
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item]
      }
    })
  }
  return breadcrumb || {}
}

const PageHeader = (pageHeader) => {
  const {
    content,
    extraContent,
    className,
    breadcrumb,
  } = pageHeader

  {breadcrumb}

  const clsString = classNames(styles.pageHeader, className)

  return (
    <div className={clsString}>
      {breadcrumb}
      <div className={styles.detail}>
        <div className={styles.main}>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  routes: PropTypes.array,
  params: PropTypes.object,
  location: PropTypes.object,
  breadcrumbNameMap: PropTypes.object,
}

export default PageHeader
