<template>
  <div>
    <el-table
      :data="tableData"
      height="645"
      style="width: 90%; margin-top: 20px; margin-left: 50px; font-size: 20px">
      <el-table-column type="index" label="序号" width="150px"></el-table-column>
      <el-table-column prop="description" label="项目描述" width="250px"></el-table-column>
      <el-table-column prop="date" label="申请时间" width="300px" sortable></el-table-column>
      <el-table-column prop="money" label="申请资金"></el-table-column>
      <el-table-column prop="state" label="申请状态"
                       :filters="[{text: '未审核', value: '未审核'},
                                  {text: '审核通过', value: '审核通过'},
                                  {text: '审核不通过', value: '审核不通过'}]"
                       :filter-method="stateFilterHandler">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.state == '未审核'" style="font-size: 20px">未审核</el-tag>
          <el-tag type="success" v-if="scope.row.state == '审核通过'" style="font-size: 20px">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.state == '审核不通过'" style="font-size: 20px">审核不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="审批人"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="dialogFormVisible = true">添加项目</el-button>
        </template>
        <template slot-scope="scope">
          <el-button @click="update(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除这条记录吗？" @confirm="handleDelete(scope.row)">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

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
        <el-button type="primary" @click="addOrUpdateProject">确 定</el-button>
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
      this.project = {};
      this.dialogFormVisible = false;
    },
    addOrUpdateProject() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.project.doctorId = user.id;
          this.$http.post("http://localhost/doctor/addOrUpdateProject", this.project).then(response => {
            let res = response.data;
            if (!res.success) {
              this.$message.error(res.message);
            } else {
              if (this.project.id) {
                this.$message.success("修改成功!");
              } else {
                this.$message.success("添加成功!");
              }
              this.cancel();
              this.getData();
            }
          });
        }
      });
    },
    stateFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      // value为删选条件
      return row[property] === value;
    },
    update(row) {
      if (row.state != "未审核") {
        this.$message.warning("该项目已经审核过，不可修改！");
        return;
      }
      this.project = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$http.get("http://localhost/doctor/deleteProject?id=" + row.id).then(response => {
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.$message.success("删除成功!");
          this.getData();
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
