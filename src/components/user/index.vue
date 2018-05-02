<template>
  <div>
      <create-user-dialog 
      :show="dialogState.create" 
      v-if="checkAuth(auth.add)" 
      @click="dispath"
      ></create-user-dialog>
      <v-data-table
      :headers="header"
      :items="items"
      :rows-per-page-items='pageItems'
      rows-per-page-text="每页条数"
      :loading="loading"
      :total-items="totalItem"
      :pagination.sync="pagination"
      >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">
            <text-btn color="purple">{{ props.item.name }}</text-btn>
        </td>
        <td>{{props.item.email}}</td>
        <td>{{props.item.phone}}</td>
        <td>
            <text-btn color="#4527A0">{{props.item.group}}</text-btn>
        </td>
        <td>
            <state 
            :state="Boolean(props.item.status)"
            :auth="auth.state"
            :item="props.item"
            @click="changeState(props.item)"
            :loading="props.item.loading"
            ></state>
        </td>
        <td>
            <edit :auth="auth.up" @click="updateInfo(props.item)"></edit>
            <deleted :auth="auth.del" @click="delUser(props.item.id)"></deleted>
        </td>
      </template>
      </v-data-table>
      <user-update v-if="checkAuth(auth.up)" 
      :userId="upUserId" 
      :loading = "dialogState.edit" 
      @close="closeUpdate"
      @complate ="complateEdit"
      ref="updateUser"
      ></user-update>
  </div>
</template>
<script>
import { VDataTable, VProgressLinear, VBtn, VIcon } from 'vuetify'
import * as meb from '@/api/user'
import { state, deleted, edit, textBtn } from '@/components/common'
import auth, {vaildAuth} from '@/common/auth'
import { success } from '@/common/toastr'
import createUserDialog from './create'
import userUpdate from './update'
export default{
  name: 'memberMange',
  components: {
    VDataTable,
    VProgressLinear,
    VBtn,
    VIcon,
    state,
    deleted,
    edit,
    textBtn,
    createUserDialog,
    userUpdate
  },
  data () {
    return {
      header: [
        {
          text: '用户ID',
          value: 'id',
          algin: 'left'
        },
        {
          text: '姓名',
          value: 'name'
        },
        {
          text: '邮箱',
          value: 'email',
          sortable: false
        },
        {
          text: '电话',
          value: 'phone'
        },
        {
          text: '用户权限组',
          value: 'group'
        },
        {
          text: '状态',
          value: 'status'
        }, {
          text: '操作',
          value: ''
        }
      ],
      items: [],
      pageItems: [10, 20, 50, 100],
      loading: true,
      totalItem: 0,
      pagination: {},
      auth: {
        add: auth.userCread,
        del: auth.userDel,
        up: auth.userUp,
        state: auth.userStat
      },
      nowPage: 1,
      pageNumber: 10,
      dialogState: {
        create: false,
        edit: false
      },
      upUserId: 0,
      upIndex: -1,
      search: {}
    }
  },
  created () {
    this.dispath()
  },
  watch: {
    pagination: {
      handler () {
        const { page, rowsPerPage } = this.pagination
        this.nowPage = page
        this.pageNumber = rowsPerPage
      },
      deep: true
    },
    nowPage () {
      this.dispath()
    },
    pageNumber () {
      this.dispath()
    }
  },
  methods: {
    delUser (id) {
      if (!id) {
        return
      }
      meb.memberDel({id: id}).then(r => {
        success('删除成功')
        this.dispath()
      })
    },
    changeState (item) {
      let state = Number(!item.status)
      let index = this.items.indexOf(item)
      item.loading = true
      Object.assign(this.items[index], item)
      meb.memberState({id: item.id, state: state}).then(res => {
        item.loading = false
        item.status = state
        Object.assign(this.items[index], item)
      })
    },
    // 重新调用
    dispath (search) {
      search = search || {}
      Object.assign(search, {
        start: (this.nowPage - 1) * this.pageNumber,
        length: this.pageNumber
      })
      this.loading = true
      console.log(search, 'req')
      meb.memberList(Object.assign({}, this.search, search)).then(res => {
        this.items = res.data.map(r => {
          r.loading = false
          return r
        })
        this.totalItem = res.total
        this.loading = false
      })
    },
    // 添加用户
    createUser () {
      this.dialogState.create = true
    },
    checkAuth (auth) {
      return vaildAuth(auth)
    },
    updateInfo (item) {
      let id = item.id
      if (!item || !id) {
        return
      }
      this.upUserId = id
      this.dialogState.edit = true
      this.upIndex = this.items.indexOf(item)
    },
    closeUpdate () {
      this.dialogState.edit = false
    },
    complateEdit () {
      const data = this.$refs.updateUser.formItem
      let item = data
      let groupStr = item.group.map(r => {
        return r.text
      }).join(',')
      if (this.upIndex !== -1) {
        Object.assign(this.items[this.upIndex], item, {group: groupStr})
      } else {
        this.dispath()
      }
    }
  }
}
</script>