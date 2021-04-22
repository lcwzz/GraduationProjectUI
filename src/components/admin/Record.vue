<template>
<div>
  <el-table
    :data="records"
    max-height="730"
    stripe
    style="width: 80%; font-size: 20px; margin-left: 70px; margin-top: 10px">
    <el-table-column type="index" label="序号" width="150px"></el-table-column>
    <el-table-column prop="doctorName" label="姓名" width="200px"></el-table-column>
    <el-table-column prop="time" sortable>
      <template slot="header" slot-scope="scope">
        <span>考勤时间</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchDate"
          style="margin-left: 5px"
          type="date"
          @change="searchByDate"
          placeholder="选择考勤日期">
        </el-date-picker>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="考勤状态"
                     :filters="[{text: '迟到', value: '迟到'},
                                {text: '早退', value: '早退'},
                                {text: '正常', value: '正常'}]"
                     :filter-method="stateFilterHandler">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.state == '正常'" style="font-size: 20px">正常</el-tag>
        <el-tag type="danger" v-if="scope.row.state == '迟到'" style="font-size: 20px">迟到</el-tag>
        <el-tag type="warning" v-if="scope.row.state == '早退'" style="font-size: 20px">早退</el-tag>
      </template>
    </el-table-column>
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
      searchDate: "",
      recordsCopy: [],
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
          this.recordsCopy = JSON.parse(JSON.stringify(this.records));
        }
      });
    },
    stateFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      // value为删选条件
      return row[property] === value;
    },
    searchByDate() {
      console.log(this.searchDate);
      if (this.searchDate == null) {
        this.records = JSON.parse(JSON.stringify(this.recordsCopy));
      } else {
        this.records = [];
        for (let i = 0; i < this.recordsCopy.length; i++) {
          if (this.recordsCopy[i].time.indexOf(this.searchDate) != -1) {
            this.records.push(this.recordsCopy[i]);
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
