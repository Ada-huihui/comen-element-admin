<template>
  <div class="app-container">
    <el-select v-model="categoryId" placeholder="请选择" @change="change(categoryId)">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
    <el-button type="primary" @click="toAdd()">新增</el-button>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="categoryId_dictTxt" label="类别" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="pubDate" label="时间" width="180" />
      <el-table-column prop="img" label="封面链接" />
      <el-table-column prop="article" label="文章链接" />
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="detailRow(tableData[scope.$index])"
          >
            查看
          </el-button>
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
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="页面模块类别">
          <el-select v-model="form.categoryId_dictTxt" placeholder="请选择类型" :disabled="!isEdit">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面标题">
          <el-input v-model="form.title" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="封面图片链接">
          <el-input v-model="form.img" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="文章内容链接">
          <el-input v-model="form.article" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-col :span="11">
            <el-date-picker v-model="form.pubDate" type="date" placeholder="选择日期" style="width: 100%;" :disabled="!isEdit" />
          </el-col>
        </el-form-item>
        <el-form-item v-if="isEdit">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getCategory, getList, addList, delList, editList } from '@/api/category'

export default {
  data() {
    return {
      dialogFormVisible: false,
      isEdit: false,
      form: {
        categoryId_dictTxt: '',
        categoryId: '',
        img: '',
        article: '',
        title: '',
        pubDate: ''
      },
      options: [],
      categoryId: '',
      tableData: []
    }
  },
  mounted() {
    this.getCategories()
    this.getList()
  },
  methods: {
    getCategories() {
      getCategory().then(res => {
        this.options = res.data.map(item => {
          return {
            'value': item.category,
            'label': item.category,
            'id': item.categoryId
          }
        })
      })
      // console.log(this.options, 111)
    },
    change(id) {
      console.log('h1h1hh1', id)
      const param = {
        categoryId: id
      }
      this.getList(param)
    },
    getList(item) {
      getList(item).then(res => {
        this.tableData = res.data.records
      })
    },
    toAdd(category) {
      this.isEdit = true
      this.form = {}
      this.dialogFormVisible = true
    },
    detailRow(data) {
      this.isEdit = false
      this.form = data
      this.dialogFormVisible = true
    },
    editRow(data) {
      this.dialogFormVisible = true
      this.form = data
      this.isEdit = true
    },
    deleteRow(data) {
      console.log(data)
      delList(data.newsId).then(res => {
        this.getList()
      })
    },
    onSubmit() {
      const { categoryId_dictTxt, img, article, title, pubDate } = this.form
      const id = this.options.filter(item => {
        return item.value === categoryId_dictTxt
      })[0].id
      const param = {
        category: categoryId_dictTxt,
        categoryId: id,
        pubDate: this.moment(pubDate).format('YYYY-MM-DD'),
        img: img,
        article: article,
        title: title
      }
      console.log(this.form.newsId, ' 1111')
      if (!this.form.newsId) {
        addList(param).then(res => {
          this.dialogFormVisible = false
          this.getList()
        })
      } else {
        param.newsId = this.form.newsId
        editList(param).then(res => {
          this.dialogFormVisible = false
          this.getList()
        })
      }
    },
    onCancel() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
