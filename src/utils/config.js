const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'Pheiot Admin',
  prefix: 'pheiotAdmin',
  footerText: 'Phe IoT Admin  © 2018',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    product: `${APIV1}/product/:id`,
    products: `${APIV1}/products`,
    message: `${APIV1}/message`,
    device: `${APIV1}/device/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
