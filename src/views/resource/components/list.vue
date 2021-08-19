<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="请选择资源分类">
              <el-option :label="cat.name" :value="cat.id" v-for="cat in resource_categorys" :key="cat.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="searching">搜索</el-button>
            <el-button @click="onReset" :disabled="searching">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        stripe
        style="width: 100%"
        v-loading="searching">
         <el-table-column
          type="index"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="url">
        </el-table-column>
        <el-table-column
          prop="description"
          label="description">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="createdTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 50]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="searching">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getAllResourceCategory } from '@/services/resource_category'
import { Form } from 'element-ui'

export default Vue.extend({
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      total: 0,
      resources: [],
      resource_categorys: [],
      searching: true
    }
  },
  created () {
    this.getAllResources()
    this.getAllResourceCategory()
  },
  methods: {
    async getAllResourceCategory () {
      const { data } = await getAllResourceCategory()
      if (data.code === '000000') {
        this.resource_categorys = data.data
      }
    },
    async getAllResources () {
      this.searching = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.searching = false
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.getAllResources()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.getAllResources()
    },
    onSubmit () {
      this.form.current = 1
      this.getAllResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.getAllResources()
    },
    handleEdit (index: number, row: Record<string, unknown>) {
      console.log(index, row)
    },
    handleDelete (index: number, row: Record<string, unknown>) {
      console.log(index, row)
    }
  }
})
</script>

<style>

</style>
