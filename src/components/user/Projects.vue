<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号" width="60px"></el-table-column>
      <el-table-column prop="description" label="项目描述"></el-table-column>
      <el-table-column prop="date" label="申请时间"></el-table-column>
      <el-table-column prop="money" label="申请资金"></el-table-column>
      <el-table-column prop="state" label="申请状态"></el-table-column>
      <el-table-column prop="name" label="审批人"></el-table-column>
    </el-table>
    <el-row style="margin-top: 20px">
      <el-col :span="8">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">添加项目</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="添加项目" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form :model="project" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="project.description"></el-input>
        </el-form-item>
        <el-form-item label="申请资金(单位:元)" prop="money">
          <el-input v-model.number="project.money"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addProject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      tableData: [],
      project: {},
      dialogFormVisible: false,
      rules: {
        description: [
          {required: true, message: '请输入项目描述', trigger: 'blur'},
        ],
        money: [
          {required: true, message: '请输入申请资金', trigger: 'blur'},
          {type: 'number', message: '资金必须为数字值', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      this.$http.get("http://localhost/doctor/findProjects?id=" + user.id).then(response => {
        console.log(response.data);
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.tableData = res.data;
        }
      });
    },
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    addProject() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.project.doctorId = user.id;
          this.$http.post("http://localhost/doctor/addProject", this.project).then(response => {
            let res = response.data;
            if (!res.success) {
              this.$message.error(res.message);
            } else {
              this.$message.success("添加成功!");
              this.dialogFormVisible = false;
              this.getData();
            }
          });
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
