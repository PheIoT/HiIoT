const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const {apiPrefix} = config


let productLogsListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      messageId: '@id',
      'deviceName': '@name',
      'statusDetail|12': '@cword',
      createTime: '@datetime',
      'description|10': '@cword',
      'type|1':['up', 'down'],
    },
  ],
})


let database = productLogsListData.data


module.exports = {

  [`GET ${apiPrefix}/message`] (req, res) {
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
}
