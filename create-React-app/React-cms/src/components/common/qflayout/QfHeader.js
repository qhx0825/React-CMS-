import React from 'react'
import { useHistory } from 'react-router-dom'

export default function QfHeader(props) {
  const history = useHistory()
  const logout = () => {
    localStorage.removeItem('token')
    props.onLogout()
    // location.reload()
  }
  return (
    <div className='qf-header' style={{textAlign: 'right', color: 'white'}}>
      <span onClick={logout}>退出登录</span>
    </div>
  )
}
