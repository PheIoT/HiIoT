import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除产品 ' + record.name + ' 吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`product/${record.id}`}>{text}</Link>,
    }, {
      title: '产品版本',
      dataIndex: 'version',
      key: 'version',
      render: text => (<span>{text==='base'
        ? '基础版'
        : '高级版'}</span>),
    }, {
      title: '产品秘钥',
      dataIndex: 'productKey',
      key: 'productKey',
    }, {
      title: '节点类型',
      dataIndex: 'pointType',
      key: 'pointType',
      render: text => (<span>{text === 'device'
        ? '设备'
        : '网关'}</span>),
    }, {
      title: '设备数',
      dataIndex: 'deviceCount',
      key: 'deviceCount',
    }, {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      // width: 120,
    }, {
      title: '操作',
      key: 'operation',
      width:100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '查看' }, { key: '2', name: '删除' }]} />
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
