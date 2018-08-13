import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Radio, Modal, Tooltip, Icon} from 'antd'

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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="产品版本" {...formItemLayout}>
          {getFieldDecorator('version',{
            initialValue: 'base',
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group>
              <Radio.Button value="base">基础版</Radio.Button>
              <Radio.Button value="advance">高级版</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label={(<span>产品名称&nbsp;
            <Tooltip title="支持中文、英文字母、数字和下划线，长度限制4~30，中文算2位">
              <Icon type="question-circle-o"/>
            </Tooltip>
          </span>
        )} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="请输入您产品的名称"/>)
          }
        </FormItem>

        <FormItem label="节点类型" {...formItemLayout}>
          {getFieldDecorator('pointType',{
            initialValue: 'device',
            rules: [
              {
                required: true,
              },
            ],
          })
          (<Radio.Group>
            <Radio value='device'>设备</Radio>
            <Radio value='netgate'>网关</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="产品描述"  hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [
              {
                required: false,
                type: 'string',
              },
            ],
          })(<Input.TextArea rows={4} placeholder='请输入产品描述'/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
