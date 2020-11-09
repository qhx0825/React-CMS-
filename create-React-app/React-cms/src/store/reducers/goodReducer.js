import {
  GET_ALL_CATES,
  GET_GOOD_LIST,
  GET_GOOD_DETAIL,
  CLEAR_GOOD_INFO
} from '../actions'

let initState = {
  msg: 'hello good',
  cateList: [],
  good: {},
  info: {}
}

export default function reducer(state=initState, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case GET_ALL_CATES:
      newState.cateList = action.payload
      return newState
    case GET_GOOD_LIST:
      newState.good = action.payload
      return newState
    case GET_GOOD_DETAIL:
      newState.info = action.payload
      return newState
    case CLEAR_GOOD_INFO:
      newState.info = {}
      return newState
    default:
      return newState
  }
}
