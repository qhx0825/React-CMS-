import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

// 解决redux不支持异步生成action的天生缺陷
import thunk from 'redux-thunk'

import studyReducer from './reducers/studyReducer'
import goodReducer from './reducers/goodReducer'

const rootReducer = combineReducers({
  study: studyReducer,
  good: goodReducer
})

// 存储数据的中心
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
