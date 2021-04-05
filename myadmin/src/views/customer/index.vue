<template>
  <div class="customer">
    <div class="cus-top">
      <el-row>
        <el-col :span="18">
         <el-button type="primary" class="cus-add" @click="addCus" size="small" >添加</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="input" class="cus-sousuo" placeholder="请输入状态" clearable></el-input>
        <el-button class="cus-find" @click="search" size="small">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="cus-bottom">
      <el-table :data="cusInfo" stripe>
        <el-table-column prop="id" label="编号"  align="center"></el-table-column>
        <el-table-column prop="username" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="status" label="状态"  align="center"></el-table-column>
        <el-table-column label="操作" align="center" color="lightblue" class="caozuo">
          <template slot-scope="scope">
            <el-button type="text" class="caozuo" @click="deleteById(scope.row)">删除</el-button>
            <el-button type="text" class="caozuo" @click="change(scope.row)">编辑</el-button>
            <el-button type="text" class="caozuo" @click="cus_details(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cus-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加/修改模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="resetForm">
      <el-form :model="form" :rules="rules" ref="myform">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="realname">
          <el-input v-model="form.realname" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="form.pass" type="password" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" style="width:410px;">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="cancelSubmit('myform')" size="small">取 消</el-button>
        <el-button type="primary" @click="formSave('myform')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: 'Customer',
  data() {
    return {
      input: '',
      cusInfo: [],
      total: 0,
      currentPage1: 1,
      pageSize: 6,
      form: {
        username: '',
        realname: "",
        telephone: '',
        pass:'',
        status: ''
      },
      title:'添加顾客信息',
      dialogFormVisible:false,
      //表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
        ],
        pass: [
          { required:true, trigger: 'blur' },
          { min: 5}
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      formLabelWidth: '180px'
    }
  },
  created() {
    this.findAll();
  },
  methods: {
    // 取消添加
    cancelSubmit(formName)
    {
      this.$refs[formName].resetFields();
      this.resetForm();
      this.dialogFormVisible=false;
    },
    // 重置表单
    resetForm()
    {
      this.form.username="",
      this.form.realname="",
      this.form.telephone="",
      this.form.pass="",
      this.form.status=""
    },
    //给详情按钮绑定事件
    cus_details(id){
      this.$router.push({path:"/cus_details/index",query:{id}});
    },
    //给确定按钮绑定事件
    formSave(formName) { 
      var self=this;
      //1.获取表单数据，表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //2.发送请求
          self.$axios.post("/customer/saveOrUpdate",qs.stringify(self.form)).then((response)=>{
            // console.log(response);
            if(response.data.status == 200){
              //保存成功
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              self.findAll();
            }else{
              //保存失败
              this.$message.error('保存失败');
            }
            self.dialogFormVisible = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //添加按钮
    addCus(){
      this.dialogFormVisible=true;
      this.title='添加顾客信息';
      this.form={}
    },
    //编辑按钮
    change(row){
      // console.log(row);
      var self =this;
      this.dialogFormVisible=true;
      this.title='编辑顾客信息';
      this.$axios.get("/customer/findCustomerById",{
        params:{
          id:row.id
        }
      }).then((response)=>{
        var row1=response.data.data;
        self.form={
          id:row.id,
          username:row.username,
          realname:row.realname,
          telephone:row.telephone,
          pass:response.data.data.password,
          status:row.status
        };
      })
    },
    //查询功能
    search(){
      if(this.input){
        this.findAll(this.input);
      }else{
        this.findAll();
      }
    },
    //查询所有顾客信息
    findAll(status) {
      if(status){
        var currentPage1 = this.currentPage1 - 1;
        var data = {
          page: currentPage1,
          pageSize: this.pageSize,
          status:status
        }
      }else{
        var currentPage1 = this.currentPage1 - 1;
        var data = {
          page: currentPage1,         
          pageSize: this.pageSize
        }
      }
      this.$axios.post('/customer/query',qs.stringify(data)).then((response) => {
        // console.log(response.data);
        this.cusInfo = response.data.data.list;
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
      var self = this;
      this.$confirm('此操作将永久删除该顾客信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = row.id;
        this.$axios.get('customer/deleteById',{
          params: {
            id
          }
        }).then((response) => {
          if(response.data.status==200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            self.findAll();
          }else{
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
.customer{
width: 100%;
margin-right:50px;
.cus-add{
  width: 56px;
  height: 32px;
  font-size: 12px;
  padding: 9px 15px;
  margin:15px;
}
.cus-sousuo{
  width: 200px;
  height: 40px;
  margin: 18px 10px;
}
.cus-find{
  width: 56px;
  height: 32px;
  font-size: 12px;
  padding: 9px 15px;
  color: #1890ff;
  border-color: #1890ff;

}
.cus-bottom{
  margin-left: 20px;
  margin-right:20px;
}
.caozuo{
  display: inline-block;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
.cus-footer{
  margin: 10px 20px;
}
}

</style>
