<template>
  <div>
    <el-form ref="form" :model="admin" label-width="80px" label-position="right"
             style="margin-left: 60px" :disabled="formCtl">
      <el-form-item label="账号">
        <el-input v-model="admin.account" disabled style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="admin.password" show-password style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="admin.name" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="admin.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="admin.age" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="admin.face">
          <el-option label="群众" value="群众"></el-option>
          <el-option label="团员" value="团员"></el-option>
          <el-option label="党员" value="党员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="admin.education">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :offset="2">
        <el-button type="success" icon="el-icon-check" @click="onSubmit" :disabled="btnSubmitCtl">提交</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit" :disabled="btnEditCtl">修改信息</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "AdminInfo",
  data() {
    return {
      btnSubmitCtl: true,
      btnEditCtl: false,
      formCtl: true,
      admin: {}
    }
  },
  created() {
    this.admin = JSON.parse(sessionStorage.getItem("admin"));
  },
  methods: {
    onSubmit() {
      this.btnSubmitCtl = true;
      this.btnEditCtl = false;
      this.formCtl = true;
      this.$http.post("http://localhost/admin/update", this.admin).then(response => {
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          sessionStorage.setItem("admin", JSON.stringify(this.admin));
          this.$message.success("更新成功！");
          location.reload();
        }
      });
    },
    edit() {
      this.formCtl = false;
      this.btnSubmitCtl = false;
      this.btnEditCtl = true;
    }
  }
}
</script>

<style scoped>

</style>
