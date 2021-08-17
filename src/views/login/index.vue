<template>
  <div class="login">
    <el-form :model="form" :rules="rules" class="login-form" label-position="top" ref="form" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="Plz input username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="submitLoading" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: 'Please enter a valid phone number', trigger: 'blur' },
          { pattern: /1\d{10}/, message: 'Please enter a valid phone number', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a valid password', trigger: 'blur' },
          { min: 6, max: 10, message: 'length must be between 6 and 10', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  methods: {
    async onSubmit () {
      this.submitLoading = true
      try {
        await (this.$refs.form as Form).validate()

        const { data } = await login(this.form)
        // console.log(data)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('login success')
        }
      } catch (err) {
        console.log(err)
      }

      this.submitLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .el-form {
    background: #fff;
    padding: 30px;
    width:300px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
