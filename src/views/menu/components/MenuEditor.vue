<template>
  <div class="menu-editor">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '修改菜单' : '添加菜单'}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option :label="menu.name" :value="menu.id" v-for="menu in parentMenuList" :key="menu.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number :min="1" v-model="form.orderNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getEditMenuInfo, saveOrUpdate } from '@/services/menu'

export default Vue.extend({
  name: 'MenuEditor',
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '123',
        href: '123',
        icon: '123',
        orderNum: 0,
        description: '123',
        shown: false
      },
      parentMenuList: [] // 父级菜单列表
    }
  },
  computed: {
    isEdit () {
      return this.$route.params.id
    }
  },
  created () {
    this.loadEditorMenu()
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      }
    },
    async loadEditorMenu () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
})
</script>

<style>

</style>
