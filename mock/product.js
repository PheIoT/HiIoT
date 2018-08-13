const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config


let productsListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      'version[base,advance]':'',
      'productKey|16':'',
      'productSecret|32':'',
      'pointType|[device,netgate]':'',
      'deviceCount|+1': 1,
      createTime: '@datetime',
      'description':'@cword',
    },
  ],
})


let database = productsListData.data


const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/products`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other} = query
    pageSize = pageSize || 10
    page = page || 1


    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${apiPrefix}/product`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')
    newData.productKey = Mock.mock('@string(16)')
    newData.secret = Mock.mock('@string(32)')
    newData.deviceCount = 0
    database.unshift(newData)

    res.status(200).end()
  },

  [`DELETE ${apiPrefix}/product/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    console.log(data)
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

}
