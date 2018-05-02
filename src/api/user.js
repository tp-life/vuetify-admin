import {g, pa, p, put, d} from '@/common/request'

// 用户列表
export const memberList = (params) => {
  return g('member', params)
}

// 更改用户状态
export const memberState = (params) => {
  return pa('member/state', params)
}

// 新增用户
export const memberCreate = (params) => {
  return p('member/create', params)
}

// 当前用户有权限分配的用户组
export const memberGroup = (params) => {
  return p('member/group', params)
}

// 获取用户详情
export const memberInfo = (params) => {
  return g('member/info', params)
}

// 修改用户
export const memberUpdate = (params) => {
  return put('member/update', params)
}

// 删除用户
export const memberDel = (params) => {
  return d('member/del', params)
}
