<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px"></el-table-column>
    <el-table-column prop="sign" label="奖惩"></el-table-column>
    <el-table-column prop="money" label="金额"></el-table-column>
    <el-table-column prop="reason" label="原因"></el-table-column>
    <el-table-column prop="name" label="创建人"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "UserExtra",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.$http.get("http://localhost/doctor/findExtra?id=" + user.id).then(response => {
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
