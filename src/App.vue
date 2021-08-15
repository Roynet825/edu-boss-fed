<template>
  <div id="app">
    <h1 class="text">Roy Edu</h1>
    <el-button>asfd</el-button>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request.ts'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(res => {
  console.log(res)
})

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
.text {
  color: $warning-color;
}
</style>
