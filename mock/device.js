const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const {apiPrefix} = config


let deviceListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'deviceName': '@name',
      'status': ['unactive', 'enable'],
      'createTime': '@datetime',
      'lastOnlineTime': '@datetime',
      'productId': '@nid',
      'productName': '@name',
      'pointType|1':['device', 'netgate'],
    },
  ],
})


let database = deviceListData.data

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

  [`GET ${apiPrefix}/device`] (req, res) {
    const {query} = req
    let {pageSize, page, ...other} = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
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

  [`DELETE ${apiPrefix}/device/:id`] (req, res) {
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
