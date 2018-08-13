import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Page} from 'components'
import PageHeaderLayout from 'layouts/PageHeaderLayout'

import queryString from 'query-string'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import BodyTitle from './components/BodyTitle'

import styles from './product.less'

const Product = ({
                   location, dispatch, product, loading,
                 }) => {
  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, currentItem, modalVisible, modalType,
  } = product

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
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['product/update'],
    title: `${modalType === 'create' ? 'Create Product' : 'Update Product'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `product/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'product/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['product/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'product/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      dispatch({
        type: 'product/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...query,
    },

    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onFilterInput (value) {
      dispatch({
        type: 'product/onFilterChange',
        payload: {
          inputFilter: value,
        },
      })
    },
    switchIsMotion () {
      dispatch({type: 'product/switchIsMotion'})
    },
  }

  const pageHeaderContent = (
    <div className={styles.pageHeaderContent}>
      <div className={styles.content}>
        <div className={styles.contentTitle}>产品管理</div>
      </div>
    </div>
  )

  const bodyTitleProps = {
    title: '产品列表',
    buttons: [{
      type: 'default',
      text: '刷新',
      style: {marginRight : '8px'},
      onClick: () => {
        console.log('on btn click')
      },
    }, {
      type: 'primary',
      text: '创建产品',
      onClick: () => {
        console.log('on btn click')
      },
    },
    ],
  }

  return (
    <PageHeaderLayout content={pageHeaderContent}>
      <Page inner>
        <BodyTitle {...bodyTitleProps}/>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    </PageHeaderLayout>
  )
}

  Product.propTypes = {
    product: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }

  export default connect(({product, loading}) => ({product, loading}))(Product)
