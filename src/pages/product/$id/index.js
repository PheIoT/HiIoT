import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Tag, Row, Col, Card, Button} from 'antd'
import styles from './index.less'
import PageHeaderLayout from 'layouts/PageHeaderLayout'
import DescriptionList from '../components/DescriptionList'
import Description from '../components/Description'
import Modal from '../components/Modal'
import queryString from "query-string"

const Detail = ({location, dispatch, productDetail, loading}) => {
  const {data, secretVisible, activeTabKey, modalVisible, modalType} = productDetail
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
      payload: key,
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
        // currentItem: {data},
      },
    })
  }

  const tabList = [
    {
      key: 'detail',
      tab: '产品信息',
    },
    {
      key: 'communication',
      tab: '消息通讯',
    },
    {
      key: 'subscription',
      tab: '服务订阅',
    },
    {
      key: 'logs',
      tab: '日志服务',
    },
  ]

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
    communication: (
      <div>b</div>
    ),
    subscription: (
      <div>c</div>
    ),
    logs: (
      <div>d</div>
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
  return (<div className="content-inner">
      <PageHeaderLayout
        title={pageTitle}
        content={pageHeaderContent}
        tabList={tabList}
        tabOnChange={tabOnchange}
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
