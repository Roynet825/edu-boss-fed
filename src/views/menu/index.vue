<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><el-button @click="$router.push({ name: 'menu-create' })">添加菜单</el-button></span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu.ts'
export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getAllMenus()
  },
  methods: {
    async getAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    },
    async handleDelete (menu : any) {
      const { data } = await deleteMenu(menu.id)
      if (data.code === '000000') {
        this.$message.success('Deleted Menu')
        this.getAllMenus()
      }
    },
    handleEdit (menu: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: menu.id
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
