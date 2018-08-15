import React from 'react'
// import PropTypes from 'prop-types'
import {Tabs, Breadcrumb} from 'antd'
// import {Link} from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.less'

const {TabPane} = Tabs


const PageHeader = (pageHeader) => {
  const {
    logo,
    title,
    action,
    content,
    extraContent,
    className,
    tabList,
    tabActiveKey,
    tabDefaultActiveKey,
    tabBarExtraContent,
    tabOnChange,
    breadcrumbRoutes,
  } = pageHeader


  const clsString = classNames(styles.pageHeader, className)

  const activeKeyProps = {}
  if (tabDefaultActiveKey !== undefined) {
    activeKeyProps.defaultActiveKey = tabDefaultActiveKey
  }
  if (tabActiveKey !== undefined) {
    activeKeyProps.activeKey = tabActiveKey
  }
  let breadcrumbItem = null
  if (breadcrumbRoutes) {
    breadcrumbItem = breadcrumbRoutes.map((item) => {
      let it = item.path === '' ?
        <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
        : <Breadcrumb.Item key={item.name} href={item.path}>{item.name}</Breadcrumb.Item>

      return it
    })
  }
  return (
    <div className={clsString}>
      {
        breadcrumbItem && breadcrumbRoutes ?
          <Breadcrumb separator=">" className={styles.breadcrumb}>
            {breadcrumbItem}
          </Breadcrumb> : ''
      }

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

export default PageHeader
