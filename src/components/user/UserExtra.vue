<template>
  <el-table
    :data="tableData"
    border
    stripe
    height="630"
    style="width: 80%; margin-left: 50px; margin-top: 10px; font-size: 20px">
    <el-table-column type="index" label="序号" width="100px"></el-table-column>
    <el-table-column prop="sign" label="奖惩"
                     :filters="[{text: '奖金', value: '奖金'},
                                {text: '罚款', value: '罚款'}]"
                     :filter-method="signFilterHandler">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.sign == '奖金'" style="font-size: 20px">奖金</el-tag>
        <el-tag type="danger" v-if="scope.row.sign == '罚款'" style="font-size: 20px">罚款</el-tag>
      </template>
    </el-table-column>
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
  },
  methods: {
    signFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      // value为删选条件
      return row[property] === value;
    },
  }
}
</script>

<style scoped>

</style>
