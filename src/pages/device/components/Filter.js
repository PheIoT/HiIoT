/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Row, Col, Input} from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}


const Filter = ({
                  onFilterChange,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                  },
                }) => {


  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  let {deviceName} = filter


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 6}} md={{span: 4}}>
        {getFieldDecorator('deviceName', {initialValue: deviceName})(
          <Input placeholder="请输入设备名称" onPressEnter={handleSubmit}/>,
        )}
      </Col>
      <Col {...ColProps} xl={{span: 8}} md={{span: 24}} sm={{span: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
        </div>
      </Col>
      <Col {...ColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div></div>
          <div className="flex-vertical-center">
            <Button type="primary">添加设备</Button>
          </div>
        </div>

      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
