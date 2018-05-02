import { checkRule, account, setData, getData } from '@/common/tool'
import {programa, permission} from '@/router/component'
import { MENU } from '../mutation-types'

function filterRule (asyncRouter, role) {
  const accssMenu = asyncRouter.filter(router => {
    if (checkRule(router.meta.auth, role) && !router.hidden) {
      if (router.children && router.children.length) {
        router.children = filterRule(router.children, role)
      }
      return true
    }
    return false
  })
  return accssMenu
}

const menu = {
  state: {
    menu: []
  },
  getters: {
    getMenu: (state) => {
      if (state.menu.length < 1) {
        return JSON.parse(getData('zbridMenu'))
      }
      return state.menu
    }
  },
  actions: {
    routerPermission: ({commit, state}, data) => {
      if (data.length < 1) {
        data = account.getRules()
      }
      let router = filterRule(permission, data)
      let me = programa.concat(router)
      setData('zbridMenu', me)
      commit(MENU, me)
    }
  },
  mutations: {
    [MENU] (state, menu) {
      state.menu = menu
    }
  }
}

export default menu
