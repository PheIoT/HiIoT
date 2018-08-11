import { request, config } from 'utils'

const { api } = config
const { products } = api

export function query (params) {
  return request({
    url: products,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: products,
    method: 'delete',
    data: params,
  })
}
