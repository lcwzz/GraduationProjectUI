<template>
  <div>
    <el-row>
      <el-col :span="16" :push="1">
        <el-input v-model="name" placeholder="请输入患者姓名搜索"></el-input>
      </el-col>
      <el-col :span="8" :push="2">
        <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="medicalRecords"
      style="width: 80%; font-size: 20px; margin-left: 70px; margin-top: 20px">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="result" label="症状" width="150"></el-table-column>
      <el-table-column prop="advice" label="医嘱" width="200"></el-table-column>
      <el-table-column prop="date" label="就诊时间" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateMedical(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-popconfirm title="确定删除这条记录吗？" @confirm="deleteMedical(scope.row)">
            <el-button slot="reference" type="danger" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px">
      <el-col :span="8" :push="1">
        <el-button type="warning" size="small" @click="addMedical">添加病历</el-button>
      </el-col>
      <el-col :span="16" :push="6">
        <el-pagination
          background
          :total="total"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          @current-change="page">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="medical" label-width="80px" label-position="right">
        <el-form-item label="姓名">
          <el-input v-model="medical.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="medical.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="medical.age"></el-input>
        </el-form-item>
        <el-form-item label="症状">
          <el-input v-model="medical.result"></el-input>
        </el-form-item>
        <el-form-item label="医嘱">
          <el-input v-model="medical.advice"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Medical",
  data() {
    return {
      medicalRecords: [],
      medical: {},
      dialogFormVisible: false,
      title: "",
      name: "",
      currentPage: 1,
      pageSize: 7,
      total: 0,
    }
  },
  created() {
    this.getMedicals(1, this.pageSize, "");
  },
  methods: {
    getMedicals(pageNum, pageSize, name) {
      let doctorId = JSON.parse(sessionStorage.getItem("user")).id;
      this.$http.get("http://localhost/doctor/getMedicalPage?pageNum=" +
        pageNum + "&pageSize=" + pageSize + "&name=" + name + "&id=" + doctorId).then(response => {
        console.log(response.data);
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.medicalRecords = res.data.medicalRecords;
          this.total = res.data.total;
        }
      });
    },
    addMedical() {
      const doctor = JSON.parse(sessionStorage.getItem("user"));
      this.medical.doctorId = doctor.id;
      this.title = "添加病历";
      this.dialogFormVisible = true;
    },
    updateMedical(row) {
      this.medical = JSON.parse(JSON.stringify(row));
      this.title = "修改病历";
      this.dialogFormVisible = true;
    },
    submit() {
      console.log(this.medical);
      this.$http.post("http://localhost/doctor/addOrUpdateMedical", this.medical).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          if (this.medical.id) {
            this.$message.success("修改成功！");
          } else {
            this.$message.success("添加成功！");
          }
          this.cancel();
          this.getMedicals(this.currentPage, this.pageSize, this.name);
        }
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.medical = {};
    },
    deleteMedical(row) {
      this.$http.get("http://localhost/doctor/deleteMedical?id=" + row.id).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.$message.success("删除成功！");
          if (((this.currentPage - 1) * this.pageSize == (this.total - 1))
            && (this.currentPage > 1)) {
            this.getMedicals(this.currentPage - 1, this.pageSize, this.name);
          } else {
            this.getMedicals(this.currentPage, this.pageSize, this.name);
          }
        }
      });
    },
    page(pageNum) {
      this.getMedicals(pageNum, this.pageSize, this.name);
    },
    search() {
      this.currentPage = 1;
      this.getMedicals(1, this.pageSize, this.name);
    },
  }
}
</script>

<style scoped>

</style>
