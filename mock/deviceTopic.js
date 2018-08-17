// const qs = require('qs')
// const Mock = require('mockjs')
const config = require('../src/utils/config')

const {apiPrefix} = config


let deviceTopicListData = [{
  id: '220000200311111111',
  deviceName: 'abc',
  deviceId: '23400020031134343',
  role: 'publish',
  msgCount: 1,
  topic: '/a1lTl0YPQ0L/tett/update',

}, {
  id: '2200002003111222222',
  deviceName: 'abc',
  deviceId: '23400020031134343',
  role: 'publish',
  msgCount: 0,
  topic: '/a1lTl0YPQ0L/tett/update/error',

}, {
  id: '220000200313333',
  deviceName: 'abc',
  deviceId: '23400020031134343',
  role: 'subscribe',
  msgCount: 3,
  topic: '/a1lTl0YPQ0L/tett/get',

},
]


let database = deviceTopicListData

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}
module.exports = {
  // [`GET /a`] (req, res) {
  [`GET ${apiPrefix}/device/:id/topic`] (req, res) {

    res.status(200).json({
      data: database,
      total: database.length,
    })
  },

  [`PATCH ${apiPrefix}/device/:did/topic/msg`] (req, res) {
    const { did } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      console.log('item:'+item.id)
      console.log('ei:'+editItem.id)
      if (item.id === editItem.id) {
        isExist = true
        item.msgCount ++
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
