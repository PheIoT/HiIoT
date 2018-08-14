import modelExtend from 'dva-model-extend'
// import queryString from "query-string"

export const model = {
  state: {
    routes: {},
    locationPathname: '',
    locationQuery: {},
  },
  effects: {
    * getRoutesForBread ({}, {put, select}) {
      const routes = yield select((s) => {
        return {
          routes: s.app.menu,
          locationPathname: s.app.locationPathname,
          locationQuery: s.app.locationQuery,
        }
      })
      yield put({payload: routes})
    },
  },
  reducers: {
    updateState (state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess (state, {payload}) {
      const {list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})
