<template>
  <div class="login">
    <div class="loginBox">
      <el-form class="loginForm" ref="form" :model="form" label-width="auto">
        <h3>欢迎访问医院职工管理系统</h3>
        <el-form-item label="账号">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-key" v-model="form.password"></el-input>
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
        password: ""
      }
    }
  },
  methods: {
    login() {
      if (this.role == "医务人员") {
        this.$router.push("/user/userInfo");
      } else {
        this.$router.push("/admin/adminInfo");
      }
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
