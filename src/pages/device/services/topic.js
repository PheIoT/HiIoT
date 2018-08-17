import { request, config } from 'utils'

const { api } = config
const { deviceTopic } = api


export function query (params) {
  return request({
    url: deviceTopic.replace(':id', params),
    method: 'get',
  })
}

