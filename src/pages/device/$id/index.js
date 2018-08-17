import React from 'react'
import PropTypes from 'prop-types'
// import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Tag, Row, Col, Card} from 'antd'
// import {Page} from 'components'
import styles from './index.less'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import DescriptionList from 'components/Description/DescriptionList'
import Description from 'components/Description/Description'
import Modal from '../components/Modal'
import queryString from "query-string"
import copy from "copy-to-clipboard/index"
import {message} from "antd/lib/index"
import TopicCard from './components/TopicCard'

// import Filter from './components/Filter'
// import List from './components/List'

const Detail = ({location, dispatch, deviceDetail}) => {
  const {
    data, secretVisible,
    // secretVisible,

    activeTabKey, modalVisible,
  } = deviceDetail

  location.query = queryString.parse(location.search)
  // const {query, pathname} = location

  // const toggleSecret = () => {
  //   dispatch({
  //     type: 'productDetail/toggleSecret',
  //     payload: !secretVisible,
  //   })
  // }

  const tabOnchange = (key) => {
    dispatch({
      type: 'deviceDetail/activeTab',
      payload: {activeTabKey: key},
    })
  }

  const tabList = [
    {
      key: 'detail',
      tab: '设备信息',
    },
    {
      key: 'topic',
      tab: 'Topic列表',
    },
  ]


  const contentList = {
    detail: (
      <Card title="设备信息" style={{marginBottom: 24}} bordered={false}>
        <DescriptionList style={{marginBottom: 24}}>
          <Description term="产品名称">{data.productName}</Description>
          <Description term="节点类型">{data.pointType === 'device' ? '设备' : '网关'}</Description>
          <Description term="设备名称">{data.deviceName} <a
            onClick={() => copyContent(data.deviceName)}>复制</a></Description>
          <Description term="当前状态">{data.isActive ? '已激活' : '未激活'} </Description>
          <Description term="IP地址">{data.ip ? data.ip : '-'}</Description>
          <Description term="固件版本">{data.dotVersion ? data.dotVersion : '-'}</Description>

        </DescriptionList>
        <DescriptionList style={{marginBottom: 24}}>
          <Description term="创建时间">{data.createTime}</Description>
          <Description term="激活时间">{data.activeTime}</Description>
          <Description term="最后上线时间">{data.lastOnlineTime}</Description>
        </DescriptionList>
      </Card>
    ),
    topic: (
      <TopicCard {...activeTabKey}/>
    ),
  }

  const breadcrumbRoutes = [{
    path: '/device',
    name: '设备管理',
  }, {
    path: '',
    name: '设备信息',
  }]

  const pageTitle = (
    <div>
      {data.deviceName} <Tag disabled> {data.isActive ? '已激活' : '未激活'} </Tag>
    </div>
  )
  const toggleSecret = () => {
    dispatch({
      type: 'deviceDetail/toggleSecret',
      payload: !secretVisible,
    })
  }

  const defaultSecret = (
    <span>产品密钥: ********<a onClick={toggleSecret}> 显示</a></span>
  )
  const fullSecret = (
    <span>产品密钥: {data.productSecret}<a onClick={() => copyContent(data.productSecret)}> 复制</a><a
      onClick={toggleSecret}> 隐藏</a></span>
  )

  const copyContent = (content) => {
    copy(content)
    message.success('复制成功')
  }

  const pageHeaderContent = (
    <div className={styles.pageHeaderContent}>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <Row>
            <Col span={6}>
              产品: {data.productName} <a> 查看</a>
            </Col>
            <Col span={6}>
              产品编号: {data.productKey} <a onClick={() => copyContent(data.productKey)}> 复制 </a>
            </Col>
            <Col span={6}>
              {secretVisible === false ? defaultSecret : fullSecret}
            </Col>
          </Row>
        </div>

      </div>
    </div>
  )
  return (<div className="content-inner">
      <PageHeaderLayout
        title={pageTitle}
        content={pageHeaderContent}
        tabList={tabList}
        tabOnChange={tabOnchange}
        breadcrumbRoutes={breadcrumbRoutes}
      >
        {contentList[activeTabKey]}
        {modalVisible && <Modal/>}
      </PageHeaderLayout>
    </div>
  )
}

Detail.propTypes = {
  deviceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({deviceDetail, loading}) => ({deviceDetail, loading}))(Detail)
