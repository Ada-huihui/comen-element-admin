<template>
  <div class="app-container">
    <el-select v-model="recruitCategory" placeholder="请选择" @change="change(recruitCategory)">
      <el-option
        v-for="item in options"
        :key="item.code"
        :label="item.text"
        :value="item.code"
      />
    </el-select>
    <el-button type="primary" @click="toAdd()">新增</el-button>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="typeText" label="类别" width="180" />
      <el-table-column prop="title" label="职位" width="180" />
      <el-table-column prop="dep" label="所属部门" width="180" />
      <el-table-column prop="place" label="工作地点" width="180" />
      <el-table-column prop="num" label="招聘人数" />
      <el-table-column prop="pubTime" label="发布时间" />
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

    <el-dialog title="职位详情" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="招聘类别">
          <el-select v-model="form.type" placeholder="请选择类型" :disabled="!isEdit">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.text"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input v-model="form.title" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="form.dep" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="岗位职责">
          <el-input v-if="isEdit" v-model="jobDescription.content" placeholder="回车添加岗位职责" @keyup.enter.native="addContent" />
          <el-row v-for="(item, index) in postContent" :key="item.content" class="list-row">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              {{ index + 1 }}:
            </el-col>
            <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="22">
              <el-input v-model="item.content" :disabled="!isEdit" />
            </el-col>
            <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="close">
              <i v-if="isEdit" class="el-icon-close" @click="delContent(index)" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="岗位要求">
          <el-input v-if="isEdit" v-model="jobRequire.content" placeholder="回车添加岗位要求" @keyup.enter.native="addRequire" />
          <el-row v-for="(item, index) in postRequire" :key="item.content" class="list-row">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              {{ index + 1 }}:
            </el-col>
            <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="22">
              <el-input v-model="item.content" :disabled="!isEdit" />
            </el-col>
            <el-col :xs="2" :sm="1" :md="1" :lg="1" :xl="1" class="close">
              <i v-if="isEdit" class="el-icon-close" @click="delRequire(index)" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input v-model.number="form.num" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input v-model="form.place" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="招聘邮箱">
          <el-input v-model="form.email" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" :disabled="!isEdit" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-col :span="11">
            <el-date-picker v-model="form.pubTime" type="date" placeholder="选择日期" style="width: 100%;" :disabled="!isEdit" />
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
import { getRecruitCategory, getRecruitList, editRecruit, delRecruit } from '@/api/hr'
export default {
  data() {
    return {
      jobDescription: {
        content: ''
      },
      jobRequire: {
        content: ''
      },
      postContent: [],
      postRequire: [],
      dialogFormVisible: false,
      isEdit: false,
      form: {
        title: '前端',
        dep: '信息部',
        email: '1152579039@qq.com',
        place: '深圳光明区',
        phone: '13726900485',
        type: '社招'
      },
      options: [],
      recruitCategory: '',
      tableData: []
    }
  },
  mounted() {
    this.getCategory()
    this.getRecruitList()
  },
  methods: {
    getCategory() {
      getRecruitCategory('recruit_category').then(res => {
        this.options = res.data
      })
    },
    addContent() {
      if (this.jobDescription.content) {
        this.postContent.push(this.jobDescription)
        this.jobDescription = { content: '' }
      }
    },
    delContent(index) {
      this.postContent.splice(index, 1)
    },
    addRequire() {
      if (this.jobRequire.content) {
        this.postRequire.push(this.jobRequire)
        this.jobRequire = { content: '' }
      }
    },
    delRequire(index) {
      this.postRequire.splice(index, 1)
    },
    change(value) {
      console.log(value)
      const param = {
        recruitCategory: value
      }
      this.getRecruitList(param)
    },
    getRecruitList(item) {
      getRecruitList(item).then(res => {
        this.tableData = res.data.records.map(item => {
          return {
            'id': item.id,
            'title': item.postText,
            'dep': item.departText,
            'postContent': item.postContent,
            'postRequire': item.postRequire,
            'pubTime': item.pubTime,
            'type': item.recruitCategory,
            'typeText': item.recruitCategory_dictTxt,
            'email': item.recruitEmail,
            'num': item.recruitNum,
            'phone': item.recruitPhone,
            'place': item.workPlace
          }
        })
      })
    },
    toAdd(category) {
      this.isEdit = true
      this.postContent = []
      this.postRequire = []
      this.form = {
        email: '1152579039@qq.com',
        place: '深圳光明区',
        phone: '13726900485'
      }
      this.dialogFormVisible = true
    },
    getData(data) {
      this.form = data
      this.postContent = data.postContent
      this.postRequire = data.postRequire
    },
    detailRow(data) {
      this.isEdit = false
      this.getData(data)
      this.dialogFormVisible = true
    },
    editRow(data) {
      this.dialogFormVisible = true
      this.getData(data)
      this.isEdit = true
    },
    deleteRow(data) {
      console.log(data)
      delRecruit(data.id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getRecruitList()
      })
    },
    onSubmit() {
      console.log(this.form)
      const { email, dep, phone, place, pubTime, title, type, num } = this.form
      const param = {
        departText: dep,
        postContent: this.postContent,
        postRequire: this.postRequire,
        postText: title,
        pubTime: this.moment(pubTime).format('YYYY-MM-DD'),
        recruitCategory: type,
        recruitEmail: email,
        recruitNum: num,
        recruitPhone: phone,
        workPlace: place
      }
      if (this.form.id) {
        param.id = this.form.id
      }
      editRecruit(param).then(res => {
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getRecruitList()
      })
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
