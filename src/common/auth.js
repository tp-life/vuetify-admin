import { checkAuth } from './tool'

/**
 * 用户权限相关对应模块
 * 此处权限应与服务端权限相对应，以更方便控制菜单与按钮的相关权限
 */

const auth = {
  // 系统设置
  sys: 'auth.*,user.*,group.*',
  // 用户管理
  user: 'user.*',
  userCread: 'user.create', // 添加用户
  userDel: 'user.del', // 删除用户
  userUp: 'user.update', // 修改用户
  userStat: 'user.stat', // 修改用户状态

  // 权限管理
  auth: 'auth.*',
  authCreate: 'auth.crate', // 添加权限
  authDel: 'auth.del', // 删除权限
  authUp: 'auth.update', // 修改权限

  // 用户组
  group: 'group.*',
  groupCreate: 'group.create',
  groupUp: 'group.update',
  groupDel: 'group.del',
  groupUser: 'group.user', // 邀请加入用户
  groupAuth: 'group.auth' // 是否具有为用户组赋予权限的权限
}

// 验证权限
export const vaildAuth = checkAuth

export default auth
