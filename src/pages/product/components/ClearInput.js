/* global document */
import React from 'react'
import {Input, Icon} from 'antd'


class ClearInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      inputValue: props.value,
      placeholder: props.placeholder,
      onPressEnter: props.onPressEnter,
    }
  }


  render () {
    const {inputValue, placeholder, onPressEnter} = this.state
    const {onChange} = this.props

    const emitEmpty = () => {
      this.inputField.focus()
      this.setState({inputValue: ''})
      onChange('')
    }
    
    const suffix = inputValue ? <Icon type="close-circle" onClick={emitEmpty}/> : null

    return (
      <Input
        placeholder={placeholder}
        suffix={suffix}
        value={inputValue}
        onChange={v => {
          this.setState({inputValue: v.target.value})
          onChange(
            v.target.value,
          )
        }}
        onPressEnter={onPressEnter}
        ref={node => this.inputField = node}
      />
    )
  }
}

export default ClearInput
