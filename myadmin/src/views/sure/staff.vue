<template>
  <div class="staff">
    <div class="staff-bottom">
      <el-table :data="staffInfo" stripe>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" color="lightblue" class="caozuo">
          <template slot-scope="scope">
            <el-button type="text" class="caozuo" @click="sure(scope.row.id)" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="staff-footer">
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
      title="审核员工"
      :visible.sync="dialogVisible"
      width="650px">
      <span class="text1">用户名:</span>{{username}}<span class="text2"></span><span class="text1">身份证号:</span><span>{{idCard}}</span><br>
      <span class="text3">身份证正面照</span><span>身份证反面照</span><br>
      <img :src="photo1" alt="" class="img" style="margin-right:115px"><img :src="photo2" alt="" class="img">
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="danger" @click="rejectIt" size="small">拒绝审核</el-button>
        <el-button type="primary" @click="passIt" size="small">审核通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: 'Staff',
  data() {
    return {
      input: '',
      staffInfo: [],
      total: 0,
      currentPage1: 1,
      pageSize: 6,
      Staff:{},
      dialogVisible: false,
      username:'',
      idCard:'',
      photo1:'',
      photo2:'',
      obj:{}
    }
  },
  created() {
    this.findAll();
  },
  methods: {
    //给模态框拒绝按钮绑定事件
    rejectIt(){
      var self=this;
      this.obj.status='禁用';
      this.$axios.post("/waiter/saveOrUpdate",qs.stringify(this.obj)).then((response)=>{
        if(response.data.status==200){
          this.$message({
            type: 'error',
            message: '审核不通过!'
          });
          self.findAll();
          self.dialogVisible=false;
        }
      });
    },
    //给模态框确定按钮绑定事件
    passIt(){
      var self=this;
      this.obj.status='启用';
      this.$axios.post("/waiter/saveOrUpdate",qs.stringify(this.obj)).then((response)=>{
        if(response.data.status==200){
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        }
        self.findAll();
        self.dialogVisible=false;
      });
    },
    //审核功能
    sure(id){
      var self=this;
      this.dialogVisible=true;
      this.$axios.get("/waiter/findWaiterById",{
        params:{
          id
        }
      }).then((response)=>{
        self.obj=response.data.data;
        self.username=self.obj.username;
        self.idCard=self.obj.idCard;
        self.photo1=self.obj.idcardPhotoPositive;
        self.photo2=self.obj.idcardPhotoNegative;
      });
    },
    findAll() {
      var currentPage1 = this.currentPage1 - 1;
      var data = {
        page: currentPage1,
        pageSize: this.pageSize
      }
      this.$axios.post('/waiter/query',qs.stringify(data)).then((response) => {
        console.log(response);
        this.staffInfo = response.data.data.list;
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
    },
    //删除功能
    deleteById(row) {
      var id = row.id;
      var self = this;
      this.$axios.get('waiter/deleteById',{
        params: {
          id
        }
      }).then((response) => {
        self.findAll();
      })
    },
    open1(row) {
      this.$confirm('此操作将永久删除该栏目信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteById(row);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.staff-bottom{
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
}
.caozuo{
  display: inline-block;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
.staff-footer{
  margin: 10px 20px;
}
.text1{
  display: inline-block;
  border: 1px solid white;
  margin-right: 10px;
  font-size: 15px;
}
.text2{
  display: inline-block;
  border: 1px solid white;
  margin-right: 235px;
}
.text3{
  display: inline-block;
  border: 1px solid white;
  margin-right: 255px;
  margin-top: 20px;
}
.img{
  width: 230px;
  height: 120px;
  margin-top: 20px;
}
</style>