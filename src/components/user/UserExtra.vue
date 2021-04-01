<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px"></el-table-column>
    <el-table-column prop="sign" label="奖惩"></el-table-column>
    <el-table-column prop="money" label="金额"></el-table-column>
    <el-table-column prop="reason" label="原因"></el-table-column>
    <el-table-column prop="admin" label="创建人"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "UserExtra",
  data() {
    return {
      tableData: [
        {
          sign: "奖励",
          money: 100,
          reason: "暂无",
          admin: "张三"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
