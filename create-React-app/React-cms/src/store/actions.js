import {
  fetchQQ,
  fetchCate,
  fetchGoodList,
  fetchGoodDetail
} from '@/utils/api'

export const CHANGE_MSG = 'CHANGE_MSG'
export const GET_QQ_MUSIC = 'GET_QQ_MUSIC'
export const GET_ALL_CATES = 'GET_ALL_CATES'
export const GET_GOOD_LIST = 'GET_GOOD_LIST'
export const GET_GOOD_DETAIL = 'GET_GOOD_DETAIL'
export const CLEAR_GOOD_INFO = 'CLEAR_GOOD_INFO'

// action生成器
// action不是函数，action实际上是一个 plain object
export function changeMsgAction(payload) {
  return {
    type: CHANGE_MSG,
    payload
  }
}

// redux默认只支持同步生成的action，不支持异步生成的action
// 使用redux-thunk把一个异步的action转化多个同步的action
export function changeMsgAsyncAction(payload) {
  return dispatch=>{
    setTimeout(()=>{
      dispatch({
        type: CHANGE_MSG,
        payload
      })
    }, 2000)
  }
}

export function getQqMusicAction(params) {
  return dispatch=>{
    fetchQQ(params).then(res=>{
      dispatch({
        type: GET_QQ_MUSIC,
        payload: res.song.list
      })
    })
  }
}

// 获取品类列表
export function getCatesActions(params) {
  return dispatch=>{
    fetchCate(params).then(res=>{
      console.log('-----', res)
      dispatch({
        type: GET_ALL_CATES,
        payload: res.list
      })
    })
  }
}

export function getGoodListAction(params) {
  return dispatch=>{
    fetchGoodList(params).then(res=>{
      dispatch({
        type: GET_GOOD_LIST,
        payload: res
      })
    })
  }
}


export function getGoodDetailAction(params) {
  return dispatch=>{
    fetchGoodDetail(params).then(res=>{
      dispatch({
        type: GET_GOOD_DETAIL,
        payload: res
      })
    })
  }
}
export function getClearInfoAction() {
  return {
    type: CLEAR_GOOD_INFO,
    payload: ''
  }
}
