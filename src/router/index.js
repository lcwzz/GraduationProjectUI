import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import UserHome from "../components/user/Home";
import UserInfo from "../components/user/UserInfo";
import UserExtra from "../components/user/UserExtra";
import Record from "../components/user/Record";
import Records from "../components/user/Records";
import Project from "../components/user/Project";
import Projects from "../components/user/Projects";
import Download from "../components/user/Download";

import AdminHome from "../components/admin/Home";
import AdminInfo from "../components/admin/AdminInfo";
import Doctor from  "../components/admin/Doctor";
import AddDoctor from "../components/admin/AddDoctor";
import AdminRecord from "../components/admin/Record";
import AddExtra from "../components/admin/AddExtra";
import AdminProject from "../components/admin/Project";
import AdminProjects from "../components/admin/Projects";
import Upload from "../components/admin/Upload";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: "/login"},
    {path: '/login', component: Login},
    {path: '/user', component: UserHome,
      children: [
        {path: 'userInfo', component: UserInfo},
        {path: 'userExtra', component: UserExtra},
        {path: 'record', component: Record},
        {path: 'records', component: Records},
        {path: 'project', component: Project},
        {path: 'projects', component: Projects},
        {path: 'download', component: Download},
      ]},
    {path: '/admin', component: AdminHome,
      children: [
        {path: 'adminInfo', component: AdminInfo},
        {path: 'doctor', component: Doctor},
        {path: 'addDoctor', component: AddDoctor},
        {path: 'record', component: AdminRecord},
        {path: 'addExtra', component: AddExtra},
        {path: 'project', component: AdminProject},
        {path: 'projects', component: AdminProjects},
        {path: 'upload', component: Upload},
      ]},
  ]
})
