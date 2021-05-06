<template>
<div>
  <el-upload
    style="width: 400px; margin-left: 50px;"
    class="upload-demo"
    ref="upload"
    drag
    :limit="1"
    :on-exceed="handleExceed"
    action="customize"
    :auto-upload="false"
    :http-request="myUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">
      <span style="margin-left: 20px;">一次只能上传一个文件！</span>
      <el-button style="margin-left: 50px;" size="mini" type="primary" @click="submitUpload">确认上传</el-button>
    </div>
  </el-upload>

  <el-table
    :data="files"
    max-height="700"
    border
    style="width: 80%; font-size: 20px; margin-left: 50px; margin-top: 20px">
    <el-table-column type="index" label="序号" width="100px"></el-table-column>
    <el-table-column prop="oldName" label="文件名"></el-table-column>
    <el-table-column prop="adminName" label="上传人"
                     :filters="[{text: '我的文件', value: '我的文件'}]"
                     :filter-method="fileFilterHandler"></el-table-column>
    <el-table-column prop="date" label="上传日期" sortable></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="downloadOrBrowseFile(scope.row, 'download')" type="text" icon="el-icon-download">下载</el-button>
        <el-button @click="downloadOrBrowseFile(scope.row, 'browse')" type="text" icon="el-icon-view">在线查看</el-button>
        <el-popconfirm v-if="" title="确定删除该文件吗？" @confirm="deleteFile(scope.row)">
          <el-button slot="reference" :disabled="canDelete(scope.row)" type="text" icon="el-icon-delete">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Upload",
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
    canDelete(row) {
      return !(JSON.parse(sessionStorage.getItem("admin")).id == row.adminId);
    },
    fileFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      return row[property] === admin.name;
    },
    handleExceed() {
      this.$message.warning(`一次只允许上传单个文件！`);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    myUpload(param) {
      console.log(param);
      let file = param.file;
      let id = JSON.parse(sessionStorage.getItem("admin")).id;
      let formData = new FormData();
      formData.append("id", id);
      formData.append("file", file);
      this.$http.post("http://localhost/admin/uploadFile", formData).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.$message.success("上传成功！");
          this.getAllFiles();
        }
        this.$refs.upload.clearFiles();
      });
    },
    downloadOrBrowseFile(row, operation){
      // 新打开页面进行操作
      open("http://localhost/file/downloadOrBrowseFile?id=" + row.id + "&opt=" + operation);
    },
    deleteFile(row) {
      this.$http.get("http://localhost/file/deleteFile?id=" + row.id).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.$message.success("删除成功！");
          this.getAllFiles();
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
