import { request, config } from 'utils'

const { api } = config
const { device } = api


export function query (params) {
  return request({
    url: device.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export function queryById (params) {
  return request({
    url: device,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: device.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: device,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: device,
    method: 'patch',
    data: params,
  })
}
