import au from '@/common/auth'

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

// 主页
let main = load('app')
// 登陆
let login = load('login')
// 用户管理首页
let user = load('user/index')
// 用户组
let group = load('group/index')
// 用户权限
let auth = load('auth/index')

export const programa = [
  {
    path: '/login',
    component: login,
    name: '登陆',
    hidden: true
  },
  {
    path: '/_401',
    component: main,
    name: '401错误',
    hidden: true
  },
    // 首页
  {
    path: '/',
    component: main,
    name: '主页',
    meta: { auth: '*' },
    icon: 'home',
    hidden: false,
    children: []
  }
]

// 需要权限验证的菜单
export const permission = [
  // 系统设置
  {
    path: '/sys',
    component: main,
    name: '系统设置',
    meta: {auth: au.sys},
    icon: 'settings',
    hidden: false,
    redirect: '/sys/user',
    children: [
      { path: '/sys/user', component: user, icon: 'account_box ', hidden: false, meta: {auth: au.user, title: 'memberMange'}, name: '用户管理' },
      { path: '/sys/group', component: group, icon: 'library_books', hidden: false, meta: {auth: au.group, title: 'groupMain'}, name: '用户组' },
      { path: '/sys/auth', component: auth, icon: 'lock', hidden: false, meta: {auth: au.auth, title: 'authMain'}, name: '权限管理' }
    ]
  }
]

let menu = programa.concat(permission)
export default menu
