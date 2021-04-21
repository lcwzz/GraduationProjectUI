<template>
<div>
  <el-row>
    <el-col :span="16" :push="1">
      <el-input v-model="name" placeholder="请输入查询条件"></el-input>
    </el-col>
    <el-col :span="8" :push="2">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="records"
    stripe
    style="width: 80%; font-size: 20px; margin-left: 50px; margin-top: 10px">
    <el-table-column type="index" label="序号" width="150px"></el-table-column>
    <el-table-column prop="doctorName" label="姓名"></el-table-column>
    <el-table-column prop="time" label="考勤时间"></el-table-column>
    <el-table-column prop="state" label="考勤状态"></el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Record",
  data() {
    return {
      records: [],
      name: "",
    }
  },
  created() {
    this.getAllRecords();
  },
  methods: {
    getAllRecords() {
      this.$http.get("http://localhost/admin/getAllRecords").then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.records = res.data;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
