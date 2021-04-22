<template>
  <el-table
    :data="tableData"
    height="635"
    style="width: 80%; margin-top: 20px; margin-left: 50px; font-size: 24px">
    <el-table-column type="index" label="序号" width="200px"></el-table-column>
    <el-table-column prop="time" label="打卡时间" sortable></el-table-column>
    <el-table-column prop="state" label="打卡状态"
                     :filters="[{text: '迟到', value: '迟到'},
                                {text: '早退', value: '早退'},
                                {text: '正常', value: '正常'}]"
                     :filter-method="stateFilterHandler">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.state == '正常'" style="font-size: 24px">正常</el-tag>
        <el-tag type="danger" v-if="scope.row.state == '迟到'" style="font-size: 24px">迟到</el-tag>
        <el-tag type="warning" v-if="scope.row.state == '早退'" style="font-size: 24px">早退</el-tag>
      </template>
    </el-table-column>
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
  },
  methods: {
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

</style>
