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
    bpid: '1',
    name: 'Products',
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
  {
    id: '3',
    mpid: '3',
    bpid: '3',
    name: 'User',
    route: '/user/',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
