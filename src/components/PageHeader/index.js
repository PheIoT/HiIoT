import React from 'react'
// import PropTypes from 'prop-types'
import {Tabs} from 'antd'
import pathToRegexp from 'path-to-regexp'
import classNames from 'classnames'
import styles from './index.less'

const {TabPane} = Tabs

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
    logo,
    title,
    action,
    content,
    extraContent,
    className,
    breadcrumb,
    tabList,
    tabActiveKey,
    tabDefaultActiveKey,
    tabBarExtraContent,
    tabOnChange,
  } = pageHeader


  const clsString = classNames(styles.pageHeader, className)

  const activeKeyProps = {}
  if (tabDefaultActiveKey !== undefined) {
    activeKeyProps.defaultActiveKey = tabDefaultActiveKey
  }
  if (tabActiveKey !== undefined) {
    activeKeyProps.activeKey = tabActiveKey
  }

  return (
    <div className={clsString}>
      {breadcrumb}
      <div className={styles.detail}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <div className={styles.main}>
          <div className={styles.row}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {action && <div className={styles.action}>{action}</div>}
          </div>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
          </div>
        </div>
      </div>

      {tabList && tabList.length ? (
        <Tabs
          className={styles.tabs}
          {...activeKeyProps}
          onChange={tabOnChange}
          tabBarExtraContent={tabBarExtraContent}
        >
          {tabList.map(item => (
            <TabPane tab={item.tab} key={item.key}/>
          ))}
        </Tabs>
      ) : null}
    </div>
  )
}

// PageHeader.propTypes = {
//
//   routes: PropTypes.array,
//   params: PropTypes.object,
//   location: PropTypes.object,
//   breadcrumbNameMap: PropTypes.object,
//   tabList:PropTypes.array,
//   tabActiveKey:PropTypes.string,
//   tabDefaultActiveKey:PropTypes.string,
//   tabBarExtraContent:PropTypes.object,
//   tabOnChange:PropTypes.func,
// }

export default PageHeader
