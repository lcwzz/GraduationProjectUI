<template>
  <div>
  <el-table
    :data="doctors"
    style="width: 80%; font-size: 20px; margin-left: 50px">
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
    <el-table-column prop="sex" label="性别" width="100"></el-table-column>
    <el-table-column prop="age" label="年龄" width="100"></el-table-column>
    <el-table-column prop="departmentName" label="科室" width="100"></el-table-column>
    <el-table-column prop="face" label="政治面貌" width="150"></el-table-column>
    <el-table-column prop="education" label="学历" width="100"></el-table-column>
    <el-table-column prop="salary" label="薪资" width="100"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="updateDoctor(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
        <el-button @click="deleteDoctor(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="修改医生信息" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="doctor" label-width="80px" label-position="right">
      <el-form-item label="姓名">
        <el-input v-model="doctor.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="doctor.sex" disabled>
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="doctor.age" disabled></el-input>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="doctor.face">
          <el-option label="群众" value="群众"></el-option>
          <el-option label="团员" value="团员"></el-option>
          <el-option label="党员" value="党员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="doctor.education">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪酬">
        <el-input v-model="doctor.salary"></el-input>
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="doctor.departmentId" filterable>
          <el-option
            v-for="department in departments"
            :label="department.name"
            :value="department.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false;">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Doctor",
  data() {
    return {
      doctors: [],
      doctor: {},
      dialogFormVisible: false,
      departments:[],
    }
  },
  created() {
    this.getDoctors();
  },
  methods: {
    getDepartments() {
      this.$http.get("http://localhost/admin/getAllDepartments").then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.departments = res.data;
        }
      });
    },
    getDoctors() {
      this.$http.get("http://localhost/admin/getAllDoctors").then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.doctors = res.data;
        }
      });
    },
    updateDoctor(row) {
      this.getDepartments();
      this.doctor = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    submit() {
      this.$http.post("http://localhost/admin/updateDoctor", this.doctor).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.dialogFormVisible = false;
          this.getDoctors();
        }
      });
    },
    deleteDoctor(row) {
      this.$confirm(
        '此操作将永久删除该医生 ' + row.name + ' 和其相关数据！',
        '删除确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$http.get("http://localhost/admin/deleteDoctor?id=" + row.id).then(response => {
            const res = response.data;
            if (!res.success) {
              this.$message.error(res.message);
            }else {
              this.$message.success("删除成功！");
              this.getDoctors();
            }
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
