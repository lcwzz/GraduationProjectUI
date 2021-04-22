<template>
  <div>
    <el-table
        :data="projects"
        max-height="720"
        border
        style="width: 80%; font-size: 20px; margin-left: 50px; margin-top: 10px">
      <el-table-column type="index" label="序号" width="80px"></el-table-column>
      <el-table-column prop="name" label="申请人" width="100px"></el-table-column>
      <el-table-column prop="description" label="项目描述" width="150px"></el-table-column>
      <el-table-column prop="money" label="申请资金" width="150px"></el-table-column>
      <el-table-column prop="date" sortable label="申请时间" width="250px"></el-table-column>
      <el-table-column prop="state" label="状态" width="150px"
                       :filters="[{text: '未审核', value: '未审核'},
                                  {text: '审核通过', value: '审核通过'},
                                  {text: '审核不通过', value: '审核不通过'}]"
                       :filter-method="stateFilterHandler"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="确定通过该项目审核吗？"
                         @confirm="updateProject(scope.row, '审核通过')">
            <el-button :disabled="scope.row.state == '审核通过'" slot="reference"
                       round type="success" icon="el-icon-circle-check">
              审核通过
            </el-button>
          </el-popconfirm>
          <el-popconfirm title="确定不通过该项目审核吗？"
                         @confirm="updateProject(scope.row, '审核不通过')">
            <el-button :disabled="scope.row.state == '审核不通过'" slot="reference"
                       round type="danger" icon="el-icon-circle-close">
              审核不通过
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [],
    }
  },
  created() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      this.$http.get("http://localhost/admin/getAllProjects?id=" + admin.id).then(response => {
        console.log(response.data);
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.projects = res.data;
        }
      });
    },
    updateProject(row, state) {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      const checkResult = {'id': row.id, 'state': state, 'adminId': admin.id};
      this.$http.post("http://localhost/admin/checkProject", checkResult).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.$message.success("成功审核！");
          this.getProjects();
        }
      });
    },
    stateFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      // value为删选条件
      return row[property] === value;
    },
  }
}
</script>

<style scoped>
.el-button {
  font-size: 15px;
}
</style>
