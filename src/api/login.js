import {p} from '@/common/request'

// 登陆
export const signIn = (params) => {
  return p('login', params)
}
