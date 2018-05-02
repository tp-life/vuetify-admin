import Vue from 'vue'
import Vuex from 'vuex'
import account from './module/account'
import menu from './module/permission'
import tagView from './module/tagCacheView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    menu,
    tagView
  }
})

export default store
