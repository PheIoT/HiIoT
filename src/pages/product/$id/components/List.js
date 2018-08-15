import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import styles from './List.less'

const List = ({
                location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: 'MessageID',
      dataIndex: 'messageId',
      key: 'messageId',
    }, {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    }, {
      title: '内容（全部）',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '状态及原因分析',
      dataIndex: 'statusDetail',
      key: 'statusDetail',
    },
  ]

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table)}
      bordered
      columns={columns}
      simple
      rowKey={record => record.id}
      components={CommonBody}
    />
  )
}

List.propTypes = {
  onViewItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
