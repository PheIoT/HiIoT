import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {model} from 'utils/model'
import {query, sendMsg} from "../../services/topic"


export default modelExtend(model, {
  namespace: 'deviceTopic',

  state: {
    list: [],
    currentTopicItem: {},
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
    * sendMsg ({payload}, {call, put, select}) {
      const params = yield select(({deviceTopic}) => {
        return {
          id: deviceTopic.currentTopicItem.id,
          deviceId: deviceTopic.currentTopicItem.deviceId,
        }
      })
      const msg = {...payload, ...params}

      const data = yield call(sendMsg, msg)
      if (data.success) {
        yield put({type: 'hideModal'})
      } else {
        throw data
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
