import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Modal, Select, Alert} from 'antd'

const {Option} = Select

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
                 item = {},
                 products = {},
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {


  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const productProps = products.map((item) => {
    return (
      <Option key={item.id} value={item.name}>{item.name}</Option>
    )
  })

  // const handleChange = () => {
  //   // const fields = getFieldsValue()
  //   // console.log(fields)
  //   handleOk()
  // }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Alert
          message="特别说明：设备名称 可以为空,当为空时,天玑云会颁发全局唯一标识符作为 设备名称。"
          type="info"
          showIcon
          style={{marginBottom:'16px'}}
        />

        <FormItem label="产品" {...formItemLayout}>
          {getFieldDecorator('productName', {
            initialValue: item.productName,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              showSearch
              style={{width: 200}}
              placeholder="请选择产品"
              optionFilterProp="children"
              // onChange={handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {productProps}
            </Select>,
          )
          }
        </FormItem>

        <FormItem label='设备名称' hasFeedback {...formItemLayout}>
          {getFieldDecorator('deviceName', {
            initialValue: item.deviceName,
          })(<Input placeholder="请输入您设备的名称"/>)
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  products: PropTypes.array,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
