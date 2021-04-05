<template>
  <div class="comment">
    <div class="comment-bottom">
      <el-table :data="commentInfo" stripe>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="content" label="评论内容" align="center"></el-table-column>
        <el-table-column prop="commentTime" label="评论时间" align="center"></el-table-column>
        <el-table-column prop="orderId" label="产品ID" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" width="175px" align="center" color="lightblue" class="caozuo">
          <template slot-scope="scope">
            <el-button type="text" class="caozuo" @click="deleteById(scope.row)">删除</el-button>
            <el-button type="text" class="caozuo" v-if="scope.row.status=='审核通过'" @click="unSure(scope.row)">拒绝审核</el-button>
            <el-button type="text" class="caozuo" v-else @click="makeSure(scope.row)">审核通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comment-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: 'Comment',
  data() {
    return {
      input: '',
      commentInfo: [],
      total: 0,
      currentPage1: 1,
      pageSize: 8,
      status:"",
      sure:''
    }
  },
  created() {
    this.findAll();
  },
  methods: {
    //通过审核
    makeSure(row){
      var obj = {
        id:row.id,
        content:row.content,
        commentTime:row.commentTime,
        orderId:row.orderId,
        status:'审核通过'
      }
      this.$axios.post("/comment/saveOrUpdate",qs.stringify(obj)).then((response)=>{
        console.log(response);
        if(response.data.status==200){
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        }  
      });  
      this.findAll();
    },
    //拒绝审核
    unSure(row){
      var obj = {
        id:row.id,
        content:row.content,
        commentTime:row.commentTime,
        orderId:row.orderId,
        status:'审核不通过'
      }
      this.$axios.post("/comment/saveOrUpdate",qs.stringify(obj)).then((response)=>{
        console.log(response);
        if(response.data.status==200){
          this.$message({
            type: 'error',
            message: '审核不通过!'
          });
        }   
      });
      this.findAll();
    },
    findAll() {
      var self=this;
      var currentPage1 = this.currentPage1 - 1;
      var data = {
        page: currentPage1,
        pageSize: this.pageSize
      }
      this.$axios.post('/comment/query',qs.stringify(data)).then((response) => {
        console.log(response);
        self.commentInfo = response.data.data.list;
        self.total = response.data.data.total;
      });
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
      var self = this;
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = row.id;
        self.$axios.get('/comment/deleteById',{
          params: {
            id
          }
        }).then((response) => {
          if(response.data.status==200){
            //删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            self.findAll();
          }else{
            //删除失败
            this.$message.error(response.data.message);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });var self = this;
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = row.id;
        self.$axios.get('/comment/deleteById',{
          params: {
            id
          }
        }).then((response) => {
          if(response.data.status==200){
            //删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            self.findAll();
          }else{
            //删除失败
            this.$message.error(response.data.message);
          }
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
.comment-bottom{
  margin-left: 20px;
  margin-right: 20px;
  margin-top:20px;
}
.caozuo{
  display: inline-block;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
.comment-footer{
  margin: 10px 20px;
}
</style>
