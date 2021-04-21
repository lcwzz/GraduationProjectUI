<template>
  <el-container style="height: 100%">
    <el-header>
      <el-row>
        <el-col :span="6">
          <span style="font-size: larger" @click="toWelcome">医院职工管理系统</span>
        </el-col>
        <el-col :span="2" :offset="16">
          <el-dropdown trigger="click" @command="logout">
            <i class="el-icon-user-solid" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-text="name">王小虎</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          unique-opened
          router
          class="el-menu-vertical-demo">
          <el-menu-item index="/admin/adminInfo">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>医生管理</span>
            </template>
            <el-menu-item index="/admin/doctor">查看医生</el-menu-item>
            <el-menu-item index="/admin/addDoctor">添加医生</el-menu-item>
            <el-menu-item index="/admin/record">查看考勤</el-menu-item>
            <el-menu-item index="/admin/addExtra">奖惩信息</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/projects">
            <i class="el-icon-document"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/department">
            <i class="el-icon-s-home"></i>
            <span slot="title">科室管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/upload">
            <i class="el-icon-upload"></i>
            <span slot="title">资料上传</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.setName();
  },
  methods: {
    setName() {
      let admin = JSON.parse(sessionStorage.getItem("admin"));
      console.log(admin)
      this.name = admin.name;
    },
    logout(command) {
      sessionStorage.clear();
      this.$router.push(command);
    },
    toWelcome() {
      this.$router.push("/admin/welcome");
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: white;
}
</style>
