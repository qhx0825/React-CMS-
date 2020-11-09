import axios from './axios'


export function fetchQQ(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    params,
    method: 'GET'
  })
}

// 获取所有品类
export function fetchCate(params) {
  return axios({
    url: '/jd/cates',
    params,
    method: 'GET'
  })
}

// 添加商品
export function fetchGoodAdd(data) {
  return axios({
    url: '/jd/good/update',
    data,
    method: 'POST'
  })
}

// 获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/jd/good/list',
    params,
    method: 'GET'
  })
}

// 删除商品
export function fetchGoodDel(params) {
  return axios({
    url: '/jd/good/del',
    params,
    method: 'GET'
  })
}

// 商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/jd/good/detail',
    params,
    method: 'GET'
  })
}

// 登录
export function fetchLogin(data) {
  return axios({
    url: '/user/login',
    method: 'POST',
    data
  })
}
