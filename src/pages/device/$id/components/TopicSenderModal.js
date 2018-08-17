import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Radio, Modal,Alert} from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const TopicSenderModal = ({
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
        <Alert message='注意：如果该Topic正在被应用使用，请谨慎操作，以防应用出现异常。' style={{marginBottom: '16px'}} type='info' showIcon/>
        <FormItem label="Topic" {...formItemLayout}>
          {item.topic}
        </FormItem>

        <FormItem label='消息内容' hasFeedback {...formItemLayout}>
          {getFieldDecorator('msg', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input.TextArea rows={4}/>)
          }
        </FormItem>

        <FormItem label="Qos" {...formItemLayout}>
          {getFieldDecorator('qos', {
            initialValue: 0,
            rules: [
              {
                required: true,
              },
            ],
          })
          (
            <Radio.Group >
              <Radio value={0}>0</Radio>
              <Radio value={1}>1</Radio>
            </Radio.Group>,
          )
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

TopicSenderModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(TopicSenderModal)
