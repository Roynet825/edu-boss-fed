<template>
  <div class="login">
    <el-form :model="form" class="login-form" label-position="top" ref="form" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="form.name" placeholder="Plz input username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
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
  }
}
</style>
