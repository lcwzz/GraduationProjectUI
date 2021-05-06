<template>
<div>
  <el-table
    :data="files"
    max-height="700"
    border
    style="width: 80%; font-size: 20px; margin-left: 50px; margin-top: 20px">
    <el-table-column type="index" label="序号" width="150px"></el-table-column>
    <el-table-column prop="oldName" label="文件名"></el-table-column>
    <el-table-column prop="adminName" label="上传人"></el-table-column>
    <el-table-column prop="date" label="上传日期" sortable></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="downloadOrBrowseFile(scope.row, 'download')" type="text" icon="el-icon-download">下载</el-button>
        <el-button @click="downloadOrBrowseFile(scope.row, 'browse')" type="text" icon="el-icon-view">在线查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Download",
  data() {
    return {
      files: [],
    }
  },
  created() {
    this.getAllFiles();
  },
  methods: {
    getAllFiles() {
      this.$http.get("http://localhost/file/getFiles").then(response => {
        console.log(response.data);
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.files = res.data;
        }
      });
    },
    downloadOrBrowseFile(row, operation) {
      // 新打开页面进行操作
      open("http://localhost/file/downloadOrBrowseFile?id=" + row.id + "&opt=" + operation);
    },
  }
}
</script>

<style scoped>

</style>
