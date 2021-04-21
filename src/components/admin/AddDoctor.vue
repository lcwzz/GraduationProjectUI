<template>
<div>
  <el-form ref="form" :rules="rules" style="margin-left: 300px" :model="doctor" label-width="80px" label-position="right">
    <el-form-item label="账号" prop="account">
      <el-input v-model="doctor.account" placeholder="请输入账号" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="doctor.password" placeholder="请输入密码" show-password style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="doctor.name" placeholder="请输入姓名" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="doctor.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="doctor.age" placeholder="请输入年龄" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="政治面貌" prop="face">
      <el-select v-model="doctor.face">
        <el-option label="群众" value="群众"></el-option>
        <el-option label="团员" value="团员"></el-option>
        <el-option label="党员" value="党员"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="学历" prop="education">
      <el-select v-model="doctor.education">
        <el-option label="大专" value="大专"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="硕士" value="硕士"></el-option>
        <el-option label="博士" value="博士"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="薪酬" prop="salary">
      <el-input v-model.number="doctor.salary" placeholder="请输入薪酬" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="科室" prop="departmentId">
      <el-select v-model="doctor.departmentId" filterable>
        <el-option
          v-for="department in departments"
          :label="department.name"
          :value="department.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" icon="el-icon-check" @click="onSubmit">提交</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "AddDoctor",
  data() {
    return {
      departments: [],
      doctor: {},
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        sex: [
          {required: true, message: '请选择性别'},
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'},
        ],
        face: [
          {required: true, message: '请选择政治面貌'},
        ],
        education: [
          {required: true, message: '请选择学历'},
        ],
        salary: [
          {required: true, message: '请输入薪资', trigger: 'blur'},
          {type: 'number', message: '薪资必须为数字值', trigger: 'blur'},
        ],
        departmentId: [
          {required: true, message: '请选择科室'},
        ]
      },
    }
  },
  created() {
    this.getDepartments();
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
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post("http://localhost/admin/addDoctor", this.doctor).then(response => {
            const res = response.data;
            if (!res.success) {
              this.$message.error(res.message);
            }else {
              this.$message.success("添加成功！");
              this.$router.push("/admin/doctor");
            }
          });
        }
      });
    },
    reset() {
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style scoped>

</style>
