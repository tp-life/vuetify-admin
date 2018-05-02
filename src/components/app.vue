<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    <v-list>
      <!-- 侧边菜单栏 -->
      <template v-for="(item,i) in menu" v-if="!item.hidden">
        
            <v-list-group :key="i" no-action v-if="item.children.length > 0"  :prepend-icon="item.icon" v-model="item.active">
              <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.children" :key="subItem.title" 
              append
              :to="subItem.path">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{subItem.icon}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            </v-list-group>
            <v-list-tile :key="i" v-else append
              :to="item.path">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
      </template>
      </v-list>
    </v-navigation-drawer>
    <!-- 头部栏 -->
    <v-toolbar
      app
      :clipped-left="clipped"
      color="blue darken-3"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
          <v-badge overlap>
              <span slot="badge">3</span>
              <v-icon dark>notifications</v-icon>
          </v-badge>
      </v-btn>
      &nbsp;&nbsp;
      <span>欢迎您，{{accountInfo.name}}</span>
      <v-btn icon>
          <v-avatar  size="36px">
              <img src="http://img.zcool.cn/community/013f5958c53a47a801219c772a5335.jpg@900w_1l_2o_100sh.jpg">
            </v-avatar>
            
      </v-btn>
      
    </v-toolbar>
    <v-content>
      <!-- 面包屑 -->
      <div>
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item key="a" to="/" >
            首页
          </v-breadcrumbs-item>
          <v-breadcrumbs-item key="d" v-if="first.name" :to="first.path">
            {{first.name}}
          </v-breadcrumbs-item>
          <v-breadcrumbs-item key="s" v-if="second">
            {{second}}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
      <v-divider></v-divider>
      <tags-view></tags-view>
      <v-divider></v-divider>
     <!-- 主体内容 -->
     <v-container >
     <v-layout row wrap>
       <v-flex>
         <v-card>
           <v-card-text>
            <transition name="fade">
              <keep-alive :include="getCacheView">
                    <router-view/>
              </keep-alive>
            </transition>
           </v-card-text>
         </v-card>    
       </v-flex>
     </v-layout>
    </v-container>    
          
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 邮箱: benot@outlook.com</span>
    </v-footer>
  
  </v-app>
</template>

<script>
import { VAvatar, VBadge, VDivider, VChip } from 'vuetify'
import * as VBreadcrumbs from 'vuetify/es5/components/VBreadcrumbs'
import * as VCard from 'vuetify/es5/components/VCard'
import { mapGetters } from 'vuex'
import TagsView from './layout/tagsView'
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ZBRID后台管理系统',
      first: {
        name: '',
        path: ''
      }
    }
  },
  computed: {
    ...mapGetters(['accountInfo', 'getMenu', 'getCacheView']),
    menu () {
      let path = this.$route.path
      let index = path.indexOf('/', 1)
      let route = path.substr(0, index)
      let parent = path.substr(0, path.lastIndexOf('/'))
      for (let v of this.getMenu) {
        if (v.hidden) {
          continue
        }
        v.active = false
        if (route === v.path) {
          v.active = true
        }
        if (parent === v.path || parent.substr(1) === v.path) {
          this.first = {
            name: v.name,
            path: v.redirect || v.path
          }
        }
      }
      return this.getMenu
    },
    second () {
      return this.$route.name
    }
  },
  components: {
    VAvatar,
    VBadge,
    ...VBreadcrumbs,
    TagsView,
    VDivider,
    VChip,
    ...VCard
  },
  name: 'App'

}
</script>
