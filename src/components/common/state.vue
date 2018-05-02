<template>
      <action :color="color" :icon="icon" :text="text" @click="handleClick" :auth="auth" :loading="loading"></action>
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
      },
      state: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    computed: {
      color () {
        return this.state ? 'teal' : 'pink'
      },
      icon () {
        return this.state ? 'check_circle' : 'cancel'
      },
      text () {
        return this.state ? '已启用' : '已禁用'
      }
    },
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>