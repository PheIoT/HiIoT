import {request, config} from 'utils'

const {api} = config
const {deviceTopic, deviceTopicMsg} = api


export function query (params) {
  return request({
    url: deviceTopic.replace(':id', params),
    method: 'get',
  })
}

export function sendMsg (params) {
  return request({
    url: deviceTopicMsg.replace(':id', params.deviceId),
    method: 'patch',
    data: params,
  })
}
