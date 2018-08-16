import React from 'react'
import {Button, Tooltip, Icon, Select, Card} from 'antd'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import queryString from 'query-string'
// import {Page} from 'components'
import Filter from './components/Filter'
import List from './components/List'
import styles from './device.less'


const Option = Select.Option

const Device = ({
                  location, dispatch, device, loading,
                }) => {
  location.query = queryString.parse(location.search)
  const {query} = location

  const {activeTabKey, list, pagination} = device
  const pageHeaderContent = (

    <Select
      className={styles.contentAction}
      showSearch
      style={{width: 130}}
      placeholder="全部产品"
      optionFilterProp="children"
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      <Option value="all">全部产品</Option>
      <Option value="a">A</Option>
      <Option value="b">B</Option>
    </Select>

  )

  const pageHeaderExtraContent = (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <p>设备总数 <Tooltip title="当前指定产品的设备总数">
          <Icon type="question-circle-o"/>
        </Tooltip></p>
        <p>10</p>
      </div>
      <div className={styles.statItem}>
        <p>激活设备 <Tooltip title="当前已激活的设备总数">
          <Icon type="question-circle-o"/>
        </Tooltip>
        </p>
        <p> 8<span> / 10</span>
        </p>
      </div>
      <div className={styles.statItem}>
        <p>当前在线 <Tooltip title="当前在线的设备总数">
          <Icon type="question-circle-o"/>
        </Tooltip>
        </p>
        <p>2</p>
      </div>
      <div className={styles.action}>
        <Button>刷新</Button>
      </div>
    </div>
  )

  const tabList = [{
    key: 'device',
    tab: '设备列表',
  },
    {
      key: 'batch',
      tab: '批次管理',
    }]

  const handleRefresh = (params) => {
    dispatch({
      type: 'device/query',
      payload: {...query, ...params},
    })
  }
  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      console.log(value)
      handleRefresh(value)

    },
    onAdd () {
      console.log('on add.')
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['product/query'],
    pagination,
    location,
    onChange (page) {
      dispatch({
        type: 'device/query',
        payload: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'device/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
  }

  const tabContent = {
    device: (
      <div>
        <Filter {...filterProps}/>
        <List {...listProps}/>
      </div>
    ),
    batch: (
      <div>batch</div>
    ),
  }

  const onTabChange = (key) => {
    dispatch({
      type: 'device/activeTab',
      payload: {activeTabKey: key},
    })
  }

  return (
    <PageHeaderLayout
      title='设备管理'
      content={pageHeaderContent}
      extraContent={pageHeaderExtraContent}
    >
      <Card
        title="设备列表"
        className={styles.tabsCard}
        bordered={false}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {tabContent[activeTabKey]}
      </Card>
    </PageHeaderLayout>
  )
}

Device.propTypes = {
  device: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({device, loading}) => ({device, loading}))(Device)
