<template>
  <div class="tagShowBlock">
    <div class="tags-view-container">
        <scroll class='tags-view-wrapper'>
          <v-chip close  
            :color="item.color"
            small
            v-model="item.active" 
            v-for="(item,i) in tags" 
            :key="i" 
            selected
            @input="close(item,i)" 
            @click="jump(item.path)"   
            >
              <v-icon size="1px" style="color:#fff" v-if="item.color">lens</v-icon> &nbsp;
              <span :style="{color:item.color?'#fff':''}">{{item.name}}</span>
            </v-chip> 
        </scroll>
    </div>   
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { VChip, VIcon } from 'vuetify'

import scroll from './scroll'
export default{
  data () {
    return {
      visable: true
    }
  },
  components: {
    VChip,
    VIcon,
    scroll
  },
  watch: {
    $route () {
      this.addCacheView()
    }
  },
  mounted () {
    this.addCacheView()
  },
  computed: {
    ...mapGetters(['getShowView']),
    tags () {
      const view = this.getShowView
      let path = this.$route.path
      let v = []
      for (let it of view) {
        it.active = true
        if (path === it.path) {
          it.color = 'green'
        } else {
          it.color = ''
        }
        v.push(it)
      }
      return v
    }
  },
  methods: {
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addCacheView () {
      let route = this.generateRoute()
      if (!route) {
        return
      }
      this.$store.dispatch('addTagView', route)
    },
    close (item, i) {
      let size = this.getShowView.length
      let path = ''
      if (size < 2) {
        path = '/'
      } else {
        path = size > i + 1 ? this.getShowView[size - 1].path : this.getShowView[size - 2].path
      }
      this.tags[i].active = false
      this.$router.push(path)
      this.$store.dispatch('delNowTag', item)
    },
    jump (item) {
      this.$router.push(item)
    }
  }
}
</script>
<style scoped  lang="less">

.tags-view-container {
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
    .scroll-wrapper{
      cursor: pointer !important;
    }
  }
}
</style>
<style>
.chip__content{
      cursor: pointer !important;
    }

</style>
