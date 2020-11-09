import React, { useState, useEffect } from 'react';

// 全局的样式文件
import '@/assets/css/app.scss'
import 'antd/dist/antd.css'

// 路由系统
import { HashRouter } from 'react-router-dom'

// 状态管理
import { Provider } from 'react-redux'
import store from '@/store'

import { QfLayout, QfLogin } from '@/components'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const login = () => {
    setIsLogin(true)
  }
  const logout = () => {
    setIsLogin(false)
  }

  // 初始化
  useEffect(()=>{
    let token = localStorage.getItem('token')
    setIsLogin(token?true:false)
  }, [])

  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isLogin ? <QfLayout onLogout={logout} /> : <QfLogin onLogin={login} />
          }
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App;
