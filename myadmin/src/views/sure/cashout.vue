<template>
  <div class="cashout">
    <div class="cashout-bottom">
      <el-table :data="cashoutInfo" stripe>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="money" label="金额" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="userId" label="员工ID" align="center"></el-table-column>
        <el-table-column label="凭证" align="center">
          <template>
            <a class="pingzheng" @click="dialogVisible = true">查看凭证</a>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150px" align="center">
          <template>
            <a class="pingzheng">已审核</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cashout-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="查看凭证"
      :visible.sync="dialogVisible"
      width="30%">
      <img src="photo" alt="" class="img-P">
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: 'Cashout',
  data() {
    return {
      input: '',
      cashoutInfo: [],
      total: 0,
      currentPage1: 1,
      pageSize: 8,
      type: '提现',
      dialogVisible: false
    }
  },
  created() {
    this.findAll();
  },
  methods: {
    findAll() {
      var currentPage1 = this.currentPage1 - 1;
      var data = {
        page: currentPage1,
        pageSize: this.pageSize,
        type: this.type
      }
      this.$axios.post('/waiter/queryShou',qs.stringify(data)).then((response) => {
        console.log(response);
        this.cashoutInfo = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    //分页查询封装函数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.findAll();
    }
  }
}
</script>

<style lang="scss" scoped>
.cashout-bottom{
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
}
.caozuo{
  display: inline-block;
  border: 1px solid white;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
.cashout-footer{
  margin: 10px 20px;
}
.pingzheng{
  color: #1890ff;
  font-size: 12px;
}
.img-P{
  width: 100px;
  height: 100px;
  background-color: rgb(243, 240, 240);
  margin-left: 100px;
}
</style>