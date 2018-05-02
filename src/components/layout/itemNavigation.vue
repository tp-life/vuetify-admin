<template>
      <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    <!-- <div v-for="(item,i) in getMenu" :key="i" v-if="!item.hidden">
            <v-list-group ></v-list-group>
    </div> -->
      <v-list>
          
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          v-if="!item.hidden"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false
    }
  },
  components: {

  },
  created () {
    console.log(this.getMenu, 'test')
  },
  computed: {
    ...mapGetters(['getMenu'])
  }
}
</script>