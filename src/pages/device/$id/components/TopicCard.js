import React from 'react'
import {connect} from 'dva'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import classnames from 'classnames'
import {Page} from 'components'

// import queryString from 'query-string'
// import {Link} from 'react-router-dom'
import styles from './TopicCard.less'

const TopicCard = ({
                     // location,
                     // dispatch,
                     deviceTopic, loading,
                   }) => {

  // location.query = queryString.parse(location.search)

  const {list} = deviceTopic


  const handleClick = (record) => {
    console.log(record)
    // onStatusChange({
    //   id: id,
    //   isEnabled: record,
    // })
  }

  const columns = [
    {
      title: '设备的Topic',
      dataIndex: 'topic',
      key: 'topic',
    }, {
      title: '设备具有的权限',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (text, record) => {
        return (<div>
          {record.role === 'publish' ? '发布' : '订阅'}
        </div>)
      },
    }, {
      title: '发布消息数',
      dataIndex: 'msgCount',
      key: 'msgCount',
      width: 150,
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 150,
      render: (text, record) => {
        return <div><a onClick={() => handleClick(record)}>发布消息</a>
        </div>
      },
    },
  ]

  const CommonBody = (props) => {
    return <tbody {...props} />
  }


  const topicProps = {
    dataSource: list,

    loading: loading.effects['deviceTopic/query'],
  }
  return (
    <Page inner>
      <Table
        {...topicProps}
        className={classnames(styles.table)}
        bordered
        columns={columns}
        simple
        pagination={false}
        rowKey={record => record.id}
        components={CommonBody}
        align={'left'}
      />
    </Page>
  )
}

TopicCard.propTypes = {
  location: PropTypes.object,
}

export default connect(({deviceTopic, loading, activeTabKey}) => ({deviceTopic, loading, activeTabKey}))(TopicCard)
