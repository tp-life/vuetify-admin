<template>
  <action :auth="auth" text="编辑" @click="handleClick" icon="edit" color="teal" :show="false"></action>
</template>
<script>
import action from './action.vue'
export default{
  components: {
    action
  },
  props: {
    auth: {
      type: String,
      default: '*'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>