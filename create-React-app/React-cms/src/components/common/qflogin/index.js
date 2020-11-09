import React, {useEffect} from 'react'
import './style.scss'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { fetchLogin } from '@/utils/api'
import { useHistory } from 'react-router-dom'

export default props => {
  const history = useHistory()

  useEffect(()=>{
    // 手动把URL改成 /#/login
    history.replace('/login')
    return undefined
  }, [])

  // 登录
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    fetchLogin(values).then(res=>{
      localStorage.setItem('token', res.token)
      history.replace('/')
      // 触发它，让App父组件更新isLogin
      props.onLogin()
      if(values.remember) {
        // 存储用户名和密码时，密码不能用明文存储
        // md5('123')
      }
    })
  }

  return(
    <div className='qf-login'>
      <div className='qf-login-wrap'>
      <Form
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '用户名是必填字段',
            },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9]{1,9}$/,
              message: '用户名以字母开头，由字母、数字组成'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码也是必填字段'
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}
