<template>
<div>
  <el-row>
    <el-col :span="16" :push="1">
      <el-input v-model="name" placeholder="请输入查询名字"></el-input>
    </el-col>
    <el-col :span="8" :push="2">
      <el-button icon="el-icon-search" circle @click="search"></el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 80%; font-size: 20px; margin-left: 70px; margin-top: 20px">
    <el-table-column type="index" label="序号" width="100px"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="sign" label="奖惩"
                     :filters="[{text: '奖金', value: '奖金'},
                                {text: '罚款', value: '罚款'}]"
                     :filter-method="signFilterHandler"></el-table-column>
    <el-table-column prop="money" label="金额"></el-table-column>
    <el-table-column prop="reason" label="原因"></el-table-column>
    <el-table-column label="操作" width="300px">
      <template slot-scope="scope">
        <el-button @click="updateExtra(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
        <el-popconfirm title="确定删除这条记录吗？" @confirm="deleteExtra(scope.row)">
          <el-button slot="reference" type="danger" icon="el-icon-delete">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="margin-top: 20px">
    <el-col :span="8" :push="1">
      <el-button type="warning" size="small" @click="addExtra">添加奖惩</el-button>
    </el-col>
    <el-col :span="16" :push="3">
      <el-pagination
        background
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        @current-change="page">
      </el-pagination>
    </el-col>
  </el-row>

  <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="extra" label-position="right" label-width="100px">
      <el-form-item label="姓名">
        <el-select v-model="extra.doctorId" filterable>
          <el-option
            v-for="doctor in doctors"
            :label="doctor.name"
            :value="doctor.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖金/罚款">
        <el-radio-group v-model="extra.sign">
          <el-radio label="奖金"></el-radio>
          <el-radio label="罚款"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="extra.money"></el-input>
      </el-form-item>
      <el-form-item label="原因">
        <el-input v-model="extra.reason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "AddExtra",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      title: "",
      extra: {},
      name: "",
      doctors: [],
      currentPage: 1,
      pageSize: 6,
      total: 0,
    }
  },
  created() {
    this.getExtra(1, this.pageSize, "");
  },
  methods: {
    getDoctors() {
      this.$http.get("http://localhost/admin/getAllDoctors").then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.doctors = res.data;
        }
      });
    },
    getExtra(pageNum, pageSize, name) {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      this.$http.get("http://localhost/admin/findExtraPage?id=" + admin.id +
          "&pageNum=" + pageNum + "&pageSize=" + pageSize + "&name=" + name).then(response => {
        console.log(response.data);
        let res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        } else {
          this.tableData = res.data.extra;
          this.total = res.data.total;
        }
      });
    },
    addExtra() {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      this.extra.adminId = admin.id;
      this.title = "添加奖惩";
      this.getDoctors();
      this.dialogFormVisible = true;
    },
    updateExtra(row) {
      this.getDoctors();
      this.extra = JSON.parse(JSON.stringify(row));
      this.extra.doctorId = parseInt(this.extra.doctorId); // 将doctorId从字符串转为数字才能回显名字
      this.title = "修改奖惩";
      this.dialogFormVisible = true;
    },
    deleteExtra(row) {
      this.$http.get("http://localhost/admin/deleteExtra?id=" + row.id).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          this.$message.success("删除成功！");
          if (((this.currentPage - 1) * this.pageSize == (this.total - 1))
              && (this.currentPage > 1)) {
            this.getExtra(this.currentPage - 1, this.pageSize, this.name);
          } else {
            this.getExtra(this.currentPage, this.pageSize, this.name);
          }
        }
      });
    },
    submit() {
      console.log(this.extra);
      this.$http.post("http://localhost/admin/addOrUpdateExtra", this.extra).then(response => {
        const res = response.data;
        if (!res.success) {
          this.$message.error(res.message);
        }else {
          if (this.extra.id) {
            this.$message.success("修改成功！");
          } else {
            this.$message.success("添加成功！");
          }
          this.cancel();
          this.getExtra(this.currentPage, this.pageSize, this.name);
        }
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.extra = {};
    },
    page(pageNum) {
      this.getExtra(pageNum, this.pageSize, this.name);
    },
    signFilterHandler(value, row, column) {
      // property为筛选列名
      const property = column['property'];
      // value为删选条件
      return row[property] === value;
    },
    search() {
      this.getExtra(1, this.pageSize, this.name);
    }
  }
}
</script>

<style scoped>

</style>
