import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import UserHome from "../components/user/Home";
import UserInfo from "../components/user/UserInfo";
import UserExtra from "../components/user/UserExtra";
import Record from "../components/user/Record";
import Records from "../components/user/Records";
import Projects from "../components/user/Projects";
import Download from "../components/user/Download";
import Medical from "../components/user/Medical";

import Welcome from "../components/admin/Welcome";
import AdminHome from "../components/admin/Home";
import AdminInfo from "../components/admin/AdminInfo";
import Doctor from  "../components/admin/Doctor";
import AddDoctor from "../components/admin/AddDoctor";
import AdminRecord from "../components/admin/Record";
import AddExtra from "../components/admin/AddExtra";
import AdminProjects from "../components/admin/Projects";
import Upload from "../components/admin/Upload";

Vue.use(Router)

const router =  new Router({
  routes: [
    {path: '/', redirect: "/login"},
    {path: '/login', component: Login},
    {path: '/user', component: UserHome,
      children: [
        {path: 'userInfo', component: UserInfo},
        {path: 'userExtra', component: UserExtra},
        {path: 'record', component: Record},
        {path: 'records', component: Records},
        {path: 'projects', component: Projects},
        {path: 'download', component: Download},
        {path: 'medical', component: Medical},
      ]},
    {path: '/admin', component: AdminHome,
      children: [
        {path: 'welcome', component: Welcome},
        {path: 'adminInfo', component: AdminInfo},
        {path: 'doctor', component: Doctor},
        {path: 'addDoctor', component: AddDoctor},
        {path: 'record', component: AdminRecord},
        {path: 'addExtra', component: AddExtra},
        {path: 'projects', component: AdminProjects},
        {path: 'upload', component: Upload},
      ]},
  ]
})

router.beforeEach((to, from, next) => {
  // to: 要访问的路径
  // from: 从哪个路径来
  // next: 函数，next() -> 放行，next(path) -> 强制跳转到path
  if (to.path === "/login") {
    return next();
  }
  const user = sessionStorage.getItem("user");
  const admin = sessionStorage.getItem("admin");
  if (!user && !admin) {
    alert("请先登录后再访问！");
    return next("/login");
  } else {
    return next();
  }
})

export default router
