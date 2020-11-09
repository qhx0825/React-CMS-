import React, {useState, useCallback, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {
  changeMsgAction,
  changeMsgAsyncAction,
  getQqMusicAction
} from '@/store/actions'


// React建议，一切外部数据最好通过props方式注入到组件中来
export default (props) => {
  // connect(mapStateToProps, fn2)
  const msg = useSelector(store=>store.study.msg)
  const msg1 = useSelector(state=>state.good.msg)
  const musicList = useSelector(store=>store.study.list)

  const [newMsg, setNewMsg] = useState('')

  // connect(fn1, mapActionsToProps)
  const dispatch = useDispatch()
  // const changeMsg = payload=>dispatch(changeMsgAction(payload))
  const changeMsg = useCallback(payload=>dispatch(changeMsgAction(payload)),[dispatch])
  const changeMsgAsync = useCallback(payload=>dispatch(changeMsgAsyncAction(payload)),[dispatch])
  const getMusic = useCallback(params=>dispatch(getQqMusicAction(params)),[dispatch])

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
    // getMusic(params)
  })

  // 表单取值
  function newMsgChange(e) {
    setNewMsg(e.target.value)
  }
  // 点击事件
  function clickHandle(num) {
    // console.log('--------------', num)
    if(!newMsg.trim()) return
    if(num === 1) {
      changeMsg(newMsg)
    }else{
      changeMsgAsync(newMsg)
    }
    setNewMsg('')
  }

  return (
    <div>
      <div>test redux hooks</div>
      <h1>{msg1}</h1>
      <h1>{msg}</h1>
      {/*
        <input value={newMsg} onChange={(e)=>setNewMsg(e.target.value)}/>
        <button onClick={()=>dispatch(changeMsgAction(newMsg))}>修改msg</button>
      */}
      <input value={newMsg} onChange={newMsgChange}/>
      <button onClick={()=>clickHandle(1)}>修改msg</button>
      <button onClick={()=>clickHandle(2)}>异步修改msg</button>
      <hr/>
      {
        musicList.map(ele=>(
          <div key={ele.id}>{ele.name}</div>
        ))
      }

    </div>
  )
}
