import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { account, checkRule } from '@/common/tool'

const noRouter = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (account.getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      let auth = to.meta.auth
      let rule = store.getters.accountRule
      if (checkRule(auth, rule)) {
        next()
      } else {
        next({path: '/_401'}) // 无权限
      }
    }
  } else {
    if (noRouter.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
})
