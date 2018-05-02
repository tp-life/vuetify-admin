import * as types from '../mutation-types'
import { account } from '@/common/tool'

const state = {
  info: '',
  rule: []
}

const getters = {
  // 用户信息
  accountInfo: (state) => {
    if (!state.info) {
      return account.getAccountInfo()
    }
    return state.info
  },
  // 用户权限
  accountRule: (state) => {
    if (state.rule.length < 1) {
      return account.getRules()
    }
    return state.rule
  }
}

const actions = {
  // 登录
  signIn: ({commit}, info) => {
    return new Promise((resolve, reject) => {
      if (account.setAccountInfo(info)) {
        commit(types.ACCOUNTINFO, info)
        resolve()
      } else {
        let err = 'error'
        reject(err)
      }
    })
  },
  // 退出登录
  signOut: ({commit}) => {
    commit(types.SINGOUT)
  },
  // 用户权限
  rules: ({commit}, info) => {
    account.setRules(info)
    commit(types.RULES, info)
  }
}

const mutations = {
  // 用户信息
  [types.ACCOUNTINFO] (state, info) {
    state.info = info
  },
  // 退出登录
  [types.SINGOUT] (state) {
    state.info = {}
  },
  // 设置权限
  [types.RULES] (state, info) {
    state.rule = info
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
