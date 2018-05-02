
// 缓存数据
export function setData (key, v) {
  if (!key) {
    return false
  }
  if (typeof v !== 'string') {
    v = JSON.stringify(v)
  }
  sessionStorage.setItem(key, v)
}

// 获取数据
export function getData (key) {
  if (!key) {
    return ''
  }
  return sessionStorage.getItem(key)
}

// 删除数据
export function delData (key) {
  if (!key) {
    return false
  }
  sessionStorage.removeItem(key)
}

/**
 * 验证规则
 * @param {*} rule 权限
 * @param {*} permissions 权限列表
 */
export function checkRule (rule, permissions) {
  if (!rule || !permissions) {
    return false
  }
  if (rule === '*') {
    return true
  }
  if (rule.indexOf('*') !== -1) {
    let index = rule.indexOf('.')
    let permi = rule.substr(0, index)
    for (let p of permissions) {
      let i = p.substr(0, p.indexOf('.'))
      if (i === permi) {
        return true
      }
    }
  } else {
    if (permissions.indexOf(rule) !== -1) {
      return true
    }
  }
  return false
}

/**
 * 权限验证
 * @param {*} auth 待检查的权限
 */
export function checkAuth (auth) {
  if (!auth) {
    return false
  }
  let allAuth = account.getRules()
  return checkRule(auth, allAuth)
}

// 获取token
export const account = {
    // 获取用户数据
  getAccountInfo: function () {
    let info = getData('accountInfo')
    if (info) {
      return JSON.parse(info)
    }
    return ''
  },
  // 设置用户数据
  setAccountInfo: function (userInfo) {
    if (!userInfo) {
      return false
    }
    setData('accountInfo', userInfo)
    setData('accountAuth', userInfo.auth)
    return true
  },
  // 获取token
  getToken: function () {
    let account = this.getAccountInfo()
    return account ? account.token : ''
  },
  // 退出登陆
  remove: function () {
    sessionStorage.clear()
    return true
  },
  // 获取权限
  getRules: function () {
    let account = getData('accountAuth')
    if (account) {
      return JSON.parse(account)
    }
    return []
  },
  // 设置权限
  setRules: function (rule) {
    if (rule.length < 1) {
      return false
    }
    setData('accountAuth', rule)
    return true
  }
}
