import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '@/pages'


export default function QfContent(props) {

  function createRoute() {
    let res = []
    // 封装递归方法
    function recursion(arr) {
      arr.map(ele=>{
        res.push(
          <Route
            exact
            key={ele.id}
            path={ele.path}
            component={ele.component}
          />
        )
        // 递归
        if(ele.children) recursion(ele.children)
        return false
      })
    }

    routes.map(ele=>{
      recursion(ele.children)
      return false
    })
    return res
  }
  return (
    <div className='qf-content'>
      <Switch>
        { createRoute() }
        <Redirect from='/*' to='/' />
      </Switch>
    </div>
  )
}
