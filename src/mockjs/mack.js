import Mock from 'mockjs'
import config from '@/../config/custom.env'
const URI = config.requestUrl

function m (url, temp, reg) {
  temp = temp || t({})
  let addr = reg ? url : URI + url
  Mock.mock(addr, temp)
}

function t (data) {
  data = data || {}
  return {
    success: true,
    msg: '',
    data: data
  }
}

function mr (reg, temp) {
  m(reg, temp, true)
}

Mock.mock(URI + 'auth', {
  success: true,
  data: ['auth.create', 'auth.update', 'auth.del'],
  msg: '获取参数错误'
})

Mock.mock(URI + 'login', {
  success: true,
  data: {
    id: 1,
    name: 'admin',
    auth: ['auth.create', 'auth.update', 'auth.del', 'user.create', 'user.update', 'user.del', 'user.stat', 'group.create', 'group.del', 'group.update', 'group.user', 'group.auth'],
    token: 'fds'
  },
  msg: '123'
})

var template = {
  success: true,
  data: {
    'total': 25,
    'data|1-20': [{
      'id|+1': 1,
      'name': '@name',
      'phone': '18080091133',
      'email': '@EMAIL',
      'status': '@integer(0,1)',
      'datetime': '@DATETIME',
      'group|1': ['管理用户组', '一般用户组', '系统管理员', '财务人员']
    }]
  },
  msg: ''

}
var temp = {
  success: true,
  msg: '',
  data: {}
}
// 用户管理
m(/member/, template, true)

// 修改用户状态
Mock.mock(URI + 'member/state', temp)
// 新增用户
m('member/create', temp)

// 用户组列表
m('member/group', {
  success: true,
  msg: '',
  data: { 1: '高级管理用户组', 2: '管理组', 3: '财务组' }
})
// 用户详情信息
m(/member\/info/, t({
  id: 1, name: 'tom', phone: '18080091133', group: {2: '管理组', 3: '财务组'}, email: 'e23434@we.com'
}), true)

// 修改用户
mr(/member\/update/)

// 删除用户
mr(/member\/del/)
