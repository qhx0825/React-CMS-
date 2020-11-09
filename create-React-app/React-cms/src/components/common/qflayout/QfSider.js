import React from 'react'

import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import routes from '@/pages'
import img from '@/utils/img'

const { SubMenu } = Menu

export default function QfSider(props) {

  function createSubMenu() {
    return routes.map(ele=>(
      <SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
        {
          ele.children && ele.children.map(ele=>(
            <Menu.Item key={ele.id}>
              <NavLink exact to={ele.path}>{ele.text}</NavLink>
            </Menu.Item>
          ))
        }
      </SubMenu>
    ))
  }

  return (
    <div className='qf-sider'>
      <img className='logo' src={img.logo} alt='qf' />
      <Menu
        style={{ width: 150 }}
        defaultOpenKeys={['sub1']}
        theme='dark'
        mode="inline"
      >
        {
          createSubMenu()
        }
      </Menu>
    </div>
  )
}

// <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//   <Menu.Item key="1">Option 1</Menu.Item>
//   <Menu.Item key="2">Option 2</Menu.Item>
//   <Menu.Item key="3">Option 3</Menu.Item>
//   <Menu.Item key="4">Option 4</Menu.Item>
// </SubMenu>
