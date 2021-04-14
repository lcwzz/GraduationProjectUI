<template>
  <div>
    <div style="margin-top: 20px; font-size: 40px; text-align: center">
      {{name}}, 欢迎访问医院职工管理系统
    </div>
    <div style="margin-top: 60px; font-size: 30px; text-align: center; color: blue">
      {{time}}
    </div>
  </div>
</template>

<script>
let moment = require("moment");
export default {
  name: "Welcome",
  data() {
    return {
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      name: "",
    };
  },
  created() {
    setInterval(this.myTimer, 1000);
    this.name = JSON.parse(sessionStorage.getItem("admin")).name;
  },
  methods: {
    myTimer() {
      this.time = moment().format("YYYY-MM-DD HH:mm:ss");
    },
  }
}
</script>

<style scoped>

</style>
