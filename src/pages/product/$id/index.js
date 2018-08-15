import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Tag, Row, Col, Card, Button} from 'antd'
import {Page} from 'components'
import styles from './index.less'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import DescriptionList from '../components/DescriptionList'
import Description from '../components/Description'
import Modal from '../components/Modal'
import queryString from "query-string"
import Filter from './components/Filter'
import List from './components/List'

const Detail = ({location, dispatch, productDetail, loading}) => {
  const {data, secretVisible, activeTabKey, message, modalVisible, modalType} = productDetail
  const {activeMsgTabKey, query: msgQuery, list: msgList, pagination: msgPagination} = message

  location.query = queryString.parse(location.search)
  const {query, pathname} = location

  const toggleSecret = () => {
    dispatch({
      type: 'productDetail/toggleSecret',
      payload: !secretVisible,
    })
  }
  const tabOnchange = (key) => {
    dispatch({
      type: 'productDetail/activeTab',
      payload: {activeTabKey: key},
    })
  }

  const defaultSecret = (
    <span>产品密钥: ********<a onClick={toggleSecret}> 显示</a></span>
  )
  const fullSecret = (
    <span>产品密钥: {data.productSecret}<a> 复制</a><a onClick={toggleSecret}> 隐藏</a></span>
  )

  const handleEditClick = () => {
    dispatch({
      type: 'productDetail/showModal',
      payload: {
        modalType: 'update',
      },
    })
  }

  const tabList = [
    {
      key: 'detail',
      tab: '产品信息',
    },
    {
      key: 'logs',
      tab: '日志服务',
    },
  ]
  const logTabList = [
    {
      key: 'up',
      tab: '上行消息分析',
    },
    {
      key: 'down',
      tab: '下行消息分析',
    },
  ]

  const onMsgTabChange = (key) => {
    dispatch({
      type: 'productDetail/activeTab',
      payload: {message: {...message, activeMsgTabKey: key}},
    })
  }

  const msgFilterProps = {
    filter: msgQuery,
    onFilterChange: (queryParam) => {
      dispatch({
        type: 'productDetail/queryMessage',
        payload: {...queryParam},
      })

    },
  }

  const msgListProps = {
    dataSource: msgList,
    loading: loading.effects['productDetail/queryMessage'],
    pagination: msgPagination,
    location,
    onChange () {
      // handleRefresh({
      //   page: page.current,
      //   pageSize: page.pageSize,
      // })
    },
  }
  // console.log(logListProps)
  // console.log(List)
  const logCardContentList = {
    up: (
      <Page inner>
        <Filter {...msgFilterProps} />
        <List {...msgListProps} />
      </Page>
    ),
    down: (
      <div>b</div>
    ),
  }
  const contentList = {
    detail: (
      <Card title="产品信息" style={{marginBottom: 24}} bordered={false}
            extra={<Button onClick={handleEditClick}>编辑</Button>}>
        <DescriptionList style={{marginBottom: 24}}>
          <Description term="产品名称">{data.name}</Description>
          <Description term="节点类型">{data.pointType === 'device' ? '设备' : '网关'}</Description>
          <Description term="设备数">{data.deviceCount}</Description>
          <Description term="产品版本">{data.version}</Description>
          <Description term="创建时间">{data.createTime}</Description>
        </DescriptionList>
        <DescriptionList style={{marginBottom: 24}}>
          <Description term="产品描述">{data.description}</Description>
        </DescriptionList>
      </Card>
    ),
    logs: (
      <Card
        title="日志服务"
        className={styles.tabsCard}
        bordered={false}
        tabList={logTabList}
        activeTabKey={activeMsgTabKey}
        onTabChange={onMsgTabChange}
      >
        {logCardContentList[activeMsgTabKey]}
      </Card>
    ),
  }

  const pageHeaderContent = (
    <div className={styles.pageHeaderContent}>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <Row>
            <Col span={6}>
              产品编号: {data.productKey} <a> 复制</a>
            </Col>
            <Col span={6}>
              {secretVisible === false ? defaultSecret : fullSecret}
            </Col>
            <Col span={6}>
              设备数: {data.deviceCount} <a> 前往管理</a>
            </Col>
          </Row>
        </div>

      </div>
    </div>
  )
  const pageTitle = (
    <div>
      {data.name} <Tag disabled> {data.version === 'base' ? '基础版' : '高级版'} </Tag>
    </div>
  )
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const modalProps = {
    item: data,
    modalType: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['product/update'],
    title: `编辑产品信息`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `productDetail/update`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'productDetail/hideModal',
      })
    },
  }

  const breadcrumbRoutes = [{
    path: '/product',
    name: '产品管理',
  }, {
    path: '',
    name: '产品信息',
  }]

  return (<div className="content-inner">
      <PageHeaderLayout
        title={pageTitle}
        content={pageHeaderContent}
        tabList={tabList}
        tabOnChange={tabOnchange}
        breadcrumbRoutes={breadcrumbRoutes}
      >
        {contentList[activeTabKey]}
        {modalVisible && <Modal {...modalProps} />}
      </PageHeaderLayout>
    </div>
  )
}

Detail.propTypes = {
  productDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({productDetail, loading}) => ({productDetail, loading}))(Detail)
