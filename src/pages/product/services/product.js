import { request, config } from 'utils'

const { api } = config
const { product } = api

export function query (params) {
  return request({
    url: product,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: product.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: product,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: product,
    method: 'patch',
    data: params,
  })
}
