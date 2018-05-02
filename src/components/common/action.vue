<template>
  <span v-if="showButton">
    <v-tooltip bottom v-if="text">
      <v-btn small icon class="mx-0" slot="activator" @click="handleClick" :loading="loading" :disabled="loading" >
        <v-icon :color="color"> {{icon}}</v-icon>
      </v-btn>
      <span>{{text}}</span>
    </v-tooltip>
    <v-btn small icon class="mx-0"  v-else @click="handleClick" :loading="loading" :disabled="loading" >
        <v-icon :color="color"> {{icon}}</v-icon>
      </v-btn>
  </span>
  
  
</template>
<script>
  import { VBtn, VIcon, VTooltip } from 'vuetify'
  import { checkAuth } from '@/common/tool'
  export default{
    components: {
      VBtn,
      VIcon,
      VTooltip
    },
    props: {
      color: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      auth: {
        type: String,
        default: '*'
      },
      text: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: true
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
      showButton () {
        if (this.show) {
          return true
        }
        return this.vaildAuth()
      }
    },
    methods: {
      handleClick () {
        if (this.vaildAuth()) {
          this.$emit('click')
        }
      },
      vaildAuth () {
        return checkAuth(this.auth)
      }
    }
}
</script>