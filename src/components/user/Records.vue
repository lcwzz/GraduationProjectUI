<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px"></el-table-column>
    <el-table-column prop="time" label="打卡时间"></el-table-column>
    <el-table-column prop="state" label="打卡状态"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Records",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.$http.get("http://localhost/doctor/findRecords?id=" + user.id).then(response => {
      console.log(response.data);
      let res = response.data;
      if (!res.success) {
        this.$message.error(res.message);
      } else {
        this.tableData = res.data;
      }
    });
  }
}
</script>

<style scoped>

</style>
