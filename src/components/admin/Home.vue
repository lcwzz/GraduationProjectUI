<template>
  <el-container style="height: 100%">
    <el-header>
      <el-row>
        <el-col :span="6">
          <span style="font-size: larger">医院职工管理系统</span>
        </el-col>
        <el-col :span="2" :offset="16">
          <el-dropdown>
            <i class="el-icon-user-solid" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
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
            <el-menu-item index="/admin/addExtra">添加奖惩</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>项目管理</span>
            </template>
            <el-menu-item index="/admin/project">正在申请的项目</el-menu-item>
            <el-menu-item index="/admin/projects">通过审批的项目</el-menu-item>
          </el-submenu>
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
