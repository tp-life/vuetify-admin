<template>
    <span class="textBtn" :style="{color:color}">
      <slot></slot>
    </span>
</template>
<script>
import { VBtn } from 'vuetify'
export default{
  components: {
    VBtn
  },
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    hanld () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
.textBtn{
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>
