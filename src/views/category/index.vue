<template>
  <div class="app-container">
    <el-button type="primary" @click="add">新增类型</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- <el-table-column prop="categoryId" label="id" width="180" /> -->
      <el-table-column prop="category" label="大标题" width="180" />
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editRow(tableData[scope.$index])"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(tableData[scope.$index])"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="类型管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型大标题" label-width="formLabelWidth">
          <el-input v-model="form.category" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, addCategory, editCategory, delCategory } from '@/api/category'
import { title } from '@/settings'

export default {
  data() {
    return {
      dialogFormVisible: false,
      isEdit: false,
      selectItem: '',
      formLabelWidth: '120px',
      form: {
        category: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    add() {
      this.dialogFormVisible = true
      this.form.category = ''
    },
    submit() {
      this.dialogFormVisible = false
      const data = {
        categoryId: this.isEdit ? this.selectItem.categoryId : '',
        category: this.form.category
      }
      if (!this.isEdit) {
        addCategory(data).then(res => {
          this.getCategories()
        })
      } else {
        editCategory(data).then(res => {
          this.getCategories()
          this.dialogFormVisible = false
          this.isEdit = false
        })
      }
    },
    getCategories() {
      getCategory().then(res => {
        this.tableData = res.data
      })
    },
    editRow(item) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.selectItem = item
      this.form.category = item.category
    },
    deleteRow(item) {
      console.log(item)
      delCategory(item.categoryId).then(res => {
        this.getCategories()
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

