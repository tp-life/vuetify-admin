<template>
<span>
  <action :auth="auth" text="删除" @click="handleClick" icon="delete" color="pink" :show="false"></action>
  <v-dialog v-model="show" max-width="450">
    <v-card>
      <v-card-title class="headline">调皮的删除提示框？</v-card-title>
      <v-card-text>
        难道你这么不喜欢我吗？偏偏要删除我。。。委屈脸🙄🙄🙄🙄🙄
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="show = false">算了，不忍心</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="ensureDel">就是这么狠，删除！</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</span>
</template>
<script>
import action from './action.vue'
import { VDialog } from 'vuetify'

export default{
  components: {
    action,
    VDialog
  },
  props: {
    auth: {
      type: String,
      default: '*'
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClick () {
      this.show = true
    },
    ensureDel () {
      this.show = false
      this.$emit('click')
    }
  }
}
</script>