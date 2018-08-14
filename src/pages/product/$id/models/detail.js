import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {model} from 'utils/model'
import {query, update} from "../../services/product"

export default modelExtend(model, {

  namespace: 'productDetail',

  state: {
    data: {},
    secretVisible: false,
    activeTabKey: 'detail',
    modalVisible: false,
  },

  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname}) => {
        const match = pathToRegexp('/product/:id').exec(pathname)
        if (match) {
          dispatch({type: 'query', payload: {id: match[1]}})
        }
      })
      // dispatch({type: 'getRoutesForBread'})
    },

  },

  effects: {
    * query ({payload}, {call, put}) {
      const data = yield call(query, payload)
      const {success, message, status, ...other} = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
    * toggleSecret ({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {
          secretVisible: payload,
        },
      })
    },
    * activeTab ({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {
          activeTabKey: payload,
        },
      })
    },

    * update ({payload}, {call, put, select}) {
      const id = yield select(({ productDetail }) => productDetail.data.id)

      const newProduct = {...payload, id}
      const reData = yield call(update, newProduct)
      if (reData.success) {
        yield put({type: 'hideModal'})
      } else {
        throw reData
      }
    },
  },

  reducers: {
    querySuccess (state, {payload}) {
      const {data} = payload
      return {
        ...state,
        data,
      }
    },
    showModal (state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal (state) {
      return {...state, modalVisible: false}
    },
  },
})
