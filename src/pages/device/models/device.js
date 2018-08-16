/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import * as deviceService from '../services/device'
import {pageModel} from 'utils/model'

const {query, remove} = deviceService

export default modelExtend(pageModel, {
  namespace: 'device',

  state: {
    query: {},
    list: [],
    currentProductName: '',
    modalVisible: false,
    modalType: 'create',
    activeTabKey: 'device',
  },

  subscriptions: {
    setup ({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/device') {
          const payload = queryString.parse(location.search) || {page: 1, pageSize: 10}
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({payload = {}}, {call, put}) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    * delete ({payload}, {call, put}) {
      const data = yield call(remove, {id: payload})
      if (data.success) {
        yield put({type: 'updateState'})
      } else {
        throw data
      }
    },
    * activeTab ({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {...payload},
      })
    },
  },

  reducers: {
    showModal (state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    }
    ,

    hideModal (state) {
      return {...state, modalVisible: false}
    }
    ,
    activeTab (state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
