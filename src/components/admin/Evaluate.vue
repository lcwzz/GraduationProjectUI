<template>
  <div>
    <el-table
      :data="doctors"
      stripe
      style="width: 80%; font-size: 20px; margin-left: 70px; margin-top: 10px">
      <el-table-column type="index" label="序号" width="150px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px"></el-table-column>
      <el-table-column prop="x" label="管理分" width="200px"></el-table-column>
      <el-table-column prop="y" label="考勤分" width="200px"></el-table-column>
      <el-table-column prop="z" label="奖惩分" width="200px"></el-table-column>
      <el-table-column prop="level" label="评级"
                       :filters="[{text: '优秀', value: '优秀'},
                                {text: '中等', value: '中等'},
                                {text: '较差', value: '较差'}]"
                       :filter-method="stateFilterHandler">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.level == '优秀'" style="font-size: 20px">优秀</el-tag>
          <el-tag type="danger" v-if="scope.row.level == '较差'" style="font-size: 20px">较差</el-tag>
          <el-tag type="warning" v-if="scope.row.level == '中等'" style="font-size: 20px">中等</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Evaluate",
  data() {
    return {
      doctors: [],
    }
  },
  created() {
    this.getDoctorEvaluation();
  },
  methods: {
    getDoctorEvaluation() {
      this.$http.get("http://localhost/admin/evaluateDoctor").then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.doctors = res.data;
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
