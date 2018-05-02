<template>
  <div>
    <h1>test page</h1>
  <input type="text" />
  </div>
</template>
<script>
import {g} from '@/common/request'
export default{
  name: 'authMain',
  data () {
    return {}
  },
  created () {
    let test = g('auth', {})
    test.then(data => {
      console.log(data, 'app dsafdfad请求')
    })
  }
}
</script>