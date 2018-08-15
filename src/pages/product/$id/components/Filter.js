/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Row, Col, DatePicker, Input} from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}


const Filter = ({
                  onFilterChange,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                  },
                }) => {
  const {RangePicker} = DatePicker

  const handleFields = (fields) => {
    const {createTime} = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD HH:mm:ss'), createTime[1].format('YYYY-MM-DD HH:mm:ss')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  let {deviceName, createTime} = filter

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    // onFilterChange(fields)
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 4}} md={{span: 4}} >
        {getFieldDecorator('deviceName', {initialValue: deviceName})(
          <Input placeholder="请输入设备名称" onPressEnter={handleSubmit}/>,
        )}
      </Col>
      <Col {...ColProps} xl={{span: 8}} md={{span: 8}} sm={{span: 12}} id="createTimeRangePicker">
        {getFieldDecorator('createTime', {initialValue: createTime})(<RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{width: '100%'}}
          onChange={handleChange.bind(null, 'createTime')}
          getCalendarContainer={() => {
            return document.getElementById('createTimeRangePicker')
          }}
        />)}
      </Col>
      <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button className="margin-right" onClick={handleSubmit}>搜索</Button>
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
