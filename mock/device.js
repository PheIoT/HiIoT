const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const {apiPrefix} = config


let deviceListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'deviceName': '@name',
      'isActived|1': false,
      'isEnabled|1': true,
      'createTime': '@datetime',
      'activeTime': '@datetime',
      'lastOnlineTime': '@datetime',
      'dotVersion|8':'',
      'ip':'@ip',
      'productId': '@nid',
      'productName': '@name',
      'pointType|1':['device', 'netgate'],
      'version|1':['base','advance'],
      'productKey|12':'',
      'productSecret|16':'',
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

  [`GET ${apiPrefix}/device/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/device/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`POST ${apiPrefix}/device`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')
    newData.productId = Mock.mock('@id')
    newData.productName = Mock.mock('@name')
    newData.isActived = false
    newData.isEnabled = true
    newData.pointType = 'device'
    database.unshift(newData)

    res.status(200).end()
  },


  [`PATCH ${apiPrefix}/device/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
