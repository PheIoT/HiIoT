import React from 'react'
import PropTypes from 'prop-types'
import {Table, Switch} from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import styles from './List.less'
import {Modal} from "antd/lib/index"

const {confirm} = Modal

const List = ({
                onDeleteItem, onStatusChange, location, ...tableProps
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

  const onChange = (id, record) => {
    onStatusChange({
      id: id,
      isEnabled: record,
    })
  }
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      render: (text, record) => {
        return (
          <Link to={`device/${record.id}`}>{record.deviceName}</Link>
        )
      },
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
      render: (text, record) => {
        return( <div>
          {record.isActived ? '已激活' : '未激活'} &nbsp;
          <Switch size='small' checked={record.isEnabled} onChange={
            (value) => {
              onChange(record.id, value)
            }}/>
        </div>)
      },
    }, {
      title: '最后上线时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
    }, {
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
  location: PropTypes.object,
  onStatusChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
}

export default List
