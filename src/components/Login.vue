<template>
  <div class="login">
    <div class="loginBox">
      <el-form class="loginForm" :rules="rules" ref="ruleForm" :model="form" label-width="auto">
        <h3>欢迎访问医院职工管理系统</h3>
        <el-form-item label="账号" prop="account">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-key" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="role">
            <el-radio label="医务人员"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      role: "医务人员",
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          {required: true, message: '账号不能为空！', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空！', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.role == "医务人员") {
            const _this = this;
            this.$http.post("http://localhost/doctor/login", this.form).then(function (response) {
              console.log(response.data);
              let res = response.data;
              if (!res.success) {
                _this.$message.error(res.message);
              } else {
                sessionStorage.setItem("user", JSON.stringify(res.data));
                _this.$router.push("/user/record");
              }
            });
          } else {
            this.$router.push("/admin/adminInfo");
          }
        }
      });
    },
  }
}
</script>

<style scoped>
.login {
  background-image: url("../assets/images/background.png");
  height: 100%;
}

.loginBox {
  height: 300px;
  width: 500px;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loginForm {
  margin: 25px;
  height: 400px;
  width: 400px;
}
</style>
