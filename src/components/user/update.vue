<template>
  <div >
    <v-layout row wrap justify-center>
      <v-dialog v-model="show" :max-width="maxWidth" persistent>
        <v-card>
          <v-card-title class="headline">编辑工作人员</v-card-title>
          <v-card-text>
            <v-form lazy-validation ref="userAddFrom" v-model="vaild">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field label="姓名" v-model="formItem.name" readonly></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="电话" v-model="formItem.phone" mask="###########" required :rules="rules.phone"></v-text-field>
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
                      return-object
                      :items="group"
                      :value="formItem.group"
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
import { memberUpdate, memberGroup, memberInfo } from '@/api/user'
import { edit } from '@/components/common'
export default{
  components: {
    VDialog,
    ...VCard,
    VForm,
    VSelect,
    VTextField,
    edit
  },
  props: {
    maxWidth: {
      type: [String, Number],
      default: '600px'
    },
    userId: Number,
    loading: {
      type: Boolean,
      default: false
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
        id: 0,
        name: '',
        phone: '',
        email: '',
        group: []
      },
      group: []
    }
  },
  watch: {
    loading () {
      this.show = this.loading
      this.upUser()
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
    upUser () {
      if (this.show) {
        memberInfo({id: this.userId}).then(res => {
          let g = []
          for (let i in res.group) {
            g.push({
              text: res.group[i],
              id: String(i)
            })
          }
          let info = {
            id: res.id,
            name: res.name,
            phone: res.phone,
            email: res.email,
            group: g
          }
          Object.assign(this.formItem, info)
        })
      }
    },
    submit () {
      if (this.$refs.userAddFrom.validate()) {
        let req = {
          id: this.formItem.id,
          name: this.formItem.name,
          phone: this.formItem.phone,
          email: this.formItem.email,
          group: []
        }
        for (let item of this.formItem.group) {
          req.group.push(item.id)
        }
        memberUpdate(req).then(r => {
          this.close()
          this.$emit('complate')
        })
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>