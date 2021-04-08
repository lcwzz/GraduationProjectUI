<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>考勤打卡</span>
      </div>
      <div class="text">
        {{time}}
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="clockClick('上班')">上班打卡</el-button>
        <el-button type="success" @click="clockClick('下班')">下班打卡</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
let moment = require("moment");
export default {
  name: "Record",
  data() {
    return {
      time: "",
    }
  },
  created() {
    setInterval(this.myTimer, 1000);
  },
  methods: {
    myTimer() {
      this.time = moment().format("YYYY-MM-DD HH:mm:ss");
    },
    clockClick(symbol) {
      const doctor = JSON.parse(sessionStorage.getItem("user"));
      var data = {
        'id': doctor.id,
        'time': this.time,
        'symbol': symbol
      };
      this.$http.post("http://localhost/doctor/signIn", data).then(response => {
        console.log(response.data);
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.$message.success("打卡成功!");
        }
      });
    },
  }
}
</script>

<style scoped>
.text {
  font-size: 30px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
