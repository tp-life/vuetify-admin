<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
        <v-card>
            <v-card-title>
                <v-icon small>power_settings_new</v-icon>
                &nbsp;&nbsp;&nbsp;欢迎登录
            </v-card-title>
            <v-card-text> 
                <v-form v-model="vaild" ref="loginForm" lazy-validation>
                    <v-text-field label="用户名" required v-model="form.userName" :rules="rules.userName" prepend-icon="account_box"></v-text-field>
                    <v-text-field label="密码" required v-model="form.password" :rules="rules.password" prepend-icon="enhanced_encryption" type="password"></v-text-field>
                    <v-btn block color="info" dark :loading="loading" @click="handleSubmit" >登录</v-btn>
                </v-form> 
            </v-card-text>     
        </v-card>
        </div>
    </div>
</template>

<script>
import { VForm, VTextField, VIcon } from 'vuetify'
import * as VCard from 'vuetify/es5/components/VCard'
import * as login from '@/api/login'
export default {
  data () {
    return {
      vaild: false,
      loading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          v => !!v || '请填写用户名'
        ],
        password: [
          v => !!v || '请输入密码'
        ]
      }
    }
  },
  components: {
    VForm,
    VTextField,
    ...VCard,
    VIcon
  },
  methods: {
    handleSubmit () {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        login.signIn(this.form).then(
            re => {
              this.$store.dispatch('signIn', re)
              this.$store.dispatch('routerPermission', re.auth)
              this.$store.dispatch('rules', re.auth)
              this.$router.push('/')
            }
        ).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>