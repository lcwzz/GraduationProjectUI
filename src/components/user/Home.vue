<template>
  <el-container style="height: 100%">
    <el-header>
      <el-row>
        <el-col :span="6">
          <span style="font-size: larger">医院职工管理系统</span>
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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>个人信息</span>
            </template>
            <el-menu-item index="/user/userInfo">基本信息</el-menu-item>
            <el-menu-item index="/user/userExtra">奖惩信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location-information"></i>
              <span>考勤信息</span>
            </template>
            <el-menu-item index="/user/record">今日考勤</el-menu-item>
            <el-menu-item index="/user/records">考勤查看</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>项目信息</span>
            </template>
            <el-menu-item index="/user/project">项目申请</el-menu-item>
            <el-menu-item index="/user/projects">项目进度查看</el-menu-item>
          </el-submenu>
          <el-menu-item index="/user/download">
            <i class="el-icon-download"></i>
            <span slot="title">资料下载</span>
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
      let user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user)
      this.name = user.name;
    },
    logout(command) {
      sessionStorage.clear();
      this.$router.push(command);
    },
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
