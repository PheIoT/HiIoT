import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import styles from './List.less'
import {Modal} from "antd/lib/index"

const {confirm} = Modal

const List = ({
                onDeleteItem, location, ...tableProps
              }) => {
  location.query = queryString.parse(location.search)

  const handleDeleteClick = (record) => {
      confirm({
        title: '确定要删除设备 ' + record.deviceName + ' 吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
  }

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    }, {
      title: '该设备所属产品',
      dataIndex: 'productName',
      key: 'productName',
    }, {
      title: '节点类型',
      dataIndex: 'pointType',
      key: 'pointType',
    }, {
      title: '状态/启用状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '最后上线时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
    },{
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 100,
      render: (text, record) => {
        return <div><Link to={`device/${record.id}`}>查看</Link> <a key='del'
                                                                   onClick={() => handleDeleteClick(record)}>删除</a>
        </div>
      },
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
