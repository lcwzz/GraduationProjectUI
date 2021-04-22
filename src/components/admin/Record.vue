<template>
<div>
  <el-table
    :data="records"
    max-height="730"
    stripe
    style="width: 80%; font-size: 20px; margin-left: 70px; margin-top: 10px">
    <el-table-column type="index" label="序号" width="150px"></el-table-column>
    <el-table-column prop="doctorName" label="姓名" width="200px"></el-table-column>
    <el-table-column prop="time" label="考勤时间" sortable></el-table-column>
    <el-table-column prop="state" label="考勤状态"
                     :filters="[{text: '迟到', value: '迟到'},
                                {text: '早退', value: '早退'},
                                {text: '正常', value: '正常'}]"
                     :filter-method="stateFilterHandler"></el-table-column>
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

</style>
