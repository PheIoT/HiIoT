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
console.log('*******')

module.exports = {
  // [`GET /a`] (req, res) {
  [`GET ${apiPrefix}/device/:id/topic`] (req, res) {
    console.log('==========')
    const {id} = req.params
    console.log(id)

    res.status(200).json({
      data: database,
      total: database.length,
    })
  },

}
