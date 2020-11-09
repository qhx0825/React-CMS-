import React, {useEffect} from 'react'

import { connect } from 'react-redux'
// 语法：connect(fn1, fn2)(Home)
import {
  changeMsgAction,
  changeMsgAsyncAction,
  getQqMusicAction
} from '@/store/actions'

// 作用：把状态管理工具中的state映射到当前组件的props
function mapStateToProps(store) {
  return {
    msg: store.study.msg,
    list: store.study.list
  }
}

// action 实际就是 {type, payload}
// action 是给 dispatch(action) 来使用
// dispatch是一个函数，作用是派发action到store中
function mapActionsToProps(dispatch) {
  return {
    // changeMsg: function(payload) {
    //   dispatch({type:1, payload})
    // }
    changeMsg: payload=>dispatch(changeMsgAction(payload)),
    changeMsgAsync: payload=>dispatch(changeMsgAsyncAction(payload)),
    getMusic: params=>dispatch(getQqMusicAction(params))
  }
}

function TestRedux(props) {
  /* eslint-disable */
  useEffect(()=>{
    const str  = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=54758256079627899&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    function handle(str) {
      let obj = {}
      str.split('&').map(ele=>{
        let arr = ele.split('=')
        obj[arr[0]] = arr[1]
        return false
      })
      return obj
    }
    const params = handle(str)
    params.w = '王菲'
    // props.getMusic(params)
    return undefined
  },[])
  /* eslint-enable */
  console.log('home props', props)
  // 修改msg
  function handleClick() {
    props.changeMsg('hello 2007')
  }
  // 异步修改msg
  function handleClick2() {
    props.changeMsgAsync('hello 2008')
  }
  return (
    <div>
      <h1>首页</h1>
      <h2>{props.msg}</h2>
      <button onClick={handleClick}>修改msg</button>
      <button onClick={handleClick2}>异步修改msg</button>
      <hr/>
      {
        props.list.map(ele=>(
          <div key={ele.id}>{ele.name}</div>
        ))
      }
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(TestRedux)

// export default connect(mapStateToProps, mapActionsToProps)((props)=>{
//   console.log('home props', props)
//   return (
//     <div>
//       <h1>首页</h1>
//     </div>
//   )
// })
