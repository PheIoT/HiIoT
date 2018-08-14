const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    name: '产品管理',
    icon: 'cloud-o',
    route: '/product',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'Product Detail',
    route: '/product/:id',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
