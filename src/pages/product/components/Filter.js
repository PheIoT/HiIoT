/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Row, Col} from 'antd'
import ClearInput from './ClearInput'

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

  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  let {name} = filter

  const clearInputProps = {
    placeholder: '请输入产品名称查询',
    onPressEnter: () => {
      handleSubmit()
    },
  }

  return (
    <Row gutter={24} style={{margin: '16px 0 0 0'}}>
      <Col {...ColProps} xl={{span: 8}} md={{span: 8}} style={{'paddingLeft': '0px'}}>
        {getFieldDecorator('name', {initialValue: name})(
          <ClearInput {...clearInputProps}/>,
        )}
      </Col>
      <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button className="margin-right" onClick={handleSubmit}>Search</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
