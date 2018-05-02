import { TAGSHOWVIEW, DELNOWTAG } from '../mutation-types'
const tagCache = {
  state: {
    cacheView: [],
    showView: []
  },
  getters: {
    getCacheView: (state) => {
      return state.cacheView
    },
    getShowView: (state) => {
      return state.showView
    }
  },
  actions: {
    addTagView ({commit, state}, view) {
      if (!view.name) {
        return
      }
      let show = {
        path: view.path,
        name: view.name,
        title: view.meta.hasOwnProperty('title') ? view.meta.title : ''
      }
      commit(TAGSHOWVIEW, show)
    },
    delNowTag ({commit}, view) {
      commit(DELNOWTAG, view)
    }
  },
  mutations: {
    [TAGSHOWVIEW] (state, view) {
      if (state.showView.some(v => v.path === view.path)) { return }
      state.showView.push(view)
      state.cacheView.push(view.title)
    },
    [DELNOWTAG] (state, view) {
      for (let [i, v] of state.showView.entries()) {
        if (v.path === view.path) {
          state.showView.splice(i, 1)
          break
        }
      }
      for (let [i, name] of state.cacheView.entries()) {
        if (view.hasOwnProperty('title') && view.title === name) {
          state.cacheView.splice(i, 1)
          break
        }
      }
    }
  }

}

export default tagCache
