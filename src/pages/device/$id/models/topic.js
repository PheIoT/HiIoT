import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {model} from 'utils/model'
import {query} from "../../services/topic"


export default modelExtend(model, {

  namespace: 'deviceTopic',

  state: {
    list: [],
    modalVisible: false,
  },

  subscriptions: {
    setup ({dispatch, history}) {

      history.listen(({pathname}) => {
        const match = pathToRegexp('/device/:id').exec(pathname)
        if (match) {
          dispatch({type: 'query', payload: {id: match[1]}})
        }
      })
    },
  },

  effects: {
    * query ({payload}, {call, put}) {
      const data = yield call(query, payload.id)
      const {success, message, status, ...other} = data
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            list: other.data,
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
          ...payload,
        },
      })
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
