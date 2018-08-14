import React from 'react'
// import PropTypes from 'prop-types'
import {Tabs, Breadcrumb} from 'antd'
import {Link} from 'react-router-dom'
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
    tabList,
    tabActiveKey,
    tabDefaultActiveKey,
    tabBarExtraContent,
    tabOnChange,
    routes,
    location,
  } = pageHeader


  const clsString = classNames(styles.pageHeader, className)

  const activeKeyProps = {}
  if (tabDefaultActiveKey !== undefined) {
    activeKeyProps.defaultActiveKey = tabDefaultActiveKey
  }
  if (tabActiveKey !== undefined) {
    activeKeyProps.activeKey = tabActiveKey
  }

  // const conversionBreadcrumbList = () => {
  //   const { breadcrumbSeparator } = pageHeader
  //   const { routes, params } = pageHeader
  //   // if (breadcrumbList && breadcrumbList.length) {
  //   //   return this.conversionFromProps()
  //   // }
  //   // 如果传入 routes 和 params 属性
  //   // If pass routes and params attributes
  //   if (routes && params) {
  //     return (
  //       <Breadcrumb
  //         className={styles.breadcrumb}
  //         routes={routes.filter(route => route.breadcrumbName)}
  //         params={params}
  //         itemRender={this.itemRender}
  //         separator={breadcrumbSeparator}
  //       />
  //     )
  //   }
  //   // 根据 location 生成 面包屑
  //   // Generate breadcrumbs based on location
  //   // if (routerLocation && routerLocation.pathname) {
  //   //   return this.conversionFromLocation(routerLocation, breadcrumbNameMap)
  //   // }
  //   return null
  // }

  // const getBreadcrumbDom = () => {
  //   const breadcrumb = conversionBreadcrumbList()
  // }

  // let breadcrumb = conversionBreadcrumbList()
  let pathArray = []
  let breads = []
  const buildRoutes = () => {

    const getPathArray = (item) => {
      pathArray.unshift(item)
      // if (item.bpid) {
      //   getPathArray(queryArray(menu, item.bpid, 'id'))
      // }

    }

    // 匹配当前路由

    let current
    for (let index in routes) {
      if (routes[index].route && pathToRegexp(routes[index].route).exec(location.pathname)) {
        current = routes[index]
        break
      }
    }
    let paramMap = {}
    if (!current) {
      pathArray.push(routes[0] || {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
      })
      pathArray.push({
        id: 404,
        name: 'Not Found',
      })
    } else {
      getPathArray(current)

      let keys = []
      let values = pathToRegexp(current.route, keys).exec(location.pathname.replace('#', ''))
      if (keys.length) {
        keys.forEach((currentValue, index) => {
          if (typeof currentValue.name !== 'string') {
            return
          }
          paramMap[currentValue.name] = values[index + 1]
        })
      }
    }
    // 递归查找父级
    breads = pathArray.map((item, key) => {
      const content = (
        <span>{item.name}</span>
      )
      return (
        <Breadcrumb.Item key={key}>
          {((pathArray.length - 1) !== key)
            ? <Link to={pathToRegexp.compile(item.route || '')(paramMap) || '#'}>
              {content}
            </Link>
            : content}
        </Breadcrumb.Item>
      )
    })


  }

  if (routes) {
    breads = buildRoutes()
  }

  return (
    <div className={clsString}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
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
