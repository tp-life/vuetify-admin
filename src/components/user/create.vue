<template>
  <div>
    <v-btn class="mb-2" dark color="indigo" @click="createUser">添加人员</v-btn>
    <v-layout row wrap justify-center>
      <v-dialog v-model="show" :max-width="maxWidth">
        <v-card>
          <v-card-title class="headline">添加工作人员</v-card-title>
          <v-card-text>
            <v-form lazy-validation ref="userAddFrom" v-model="vaild">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field label="姓名" v-model="formItem.name" required :rules="rules.name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="电话" v-model="formItem.phone" mask="###########" required :rules="rules.phone"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="密码" v-model="formItem.password" type="password" required :rules="rules.password"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="邮箱" v-model="formItem.email"  :rules="rules.email"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      label="用户权限组"
                      multiple
                      autocomplete
                      chips
                      v-model="formItem.group"
                      hint="用户所具备权限的组别，用户将拥有所选权限组的所有权限"
                      item-text="text"
                      item-value="id"
                      :items="group"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">关闭</v-btn>
            <v-btn flat color="primary" @click="submit">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import {VDialog, VForm, VSelect, VTextField} from 'vuetify'
import * as VCard from 'vuetify/es5/components/VCard'
import { memberCreate, memberGroup } from '@/api/user'
export default{
  components: {
    VDialog,
    ...VCard,
    VForm,
    VSelect,
    VTextField

  },
  props: {
    maxWidth: {
      type: [String, Number],
      default: '600px'
    },
    groupData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      show: false,
      vaild: true,
      rules: {
        name: [
          v => !!v || '请填写用户姓名',
          v => (v.length < 10) || '姓名不能超出十个字'
        ],
        phone: [
          v => !!v || '请填写电话',
          v => /1\d{10}/.test(v) || '电话号码必须为十一位数字'
        ],
        password: [
          v => !!v || '请填写用密码',
          v => v >= 6 || '密码位数应不少于6位'
        ],
        email: [
          v => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail 格式不正确'
        ]
      },
      formItem: {
        name: '',
        phone: '',
        password: '',
        email: '',
        group: []
      },
      group: []
    }
  },
  created () {
    if (this.groupData !== null) {
      this.group = this.groupData
      return
    }
    memberGroup().then(res => {
      for (let i in res) {
        this.group.push({
          text: res[i],
          id: i
        })
      }
    })
  },
  methods: {
    createUser () {
      this.show = true
    },
    submit () {
      if (this.$refs.userAddFrom.validate()) {
        memberCreate(this.formItem).then(r => {
          this.close()
          this.$emit('click')
        })
      }
    },
    close () {
      this.$refs.userAddFrom.reset()
      this.show = false
      Object.assign(this.formItem, {
        name: '',
        phone: '',
        password: '',
        email: '',
        group: []
      })
    }
  }
}
</script>