<template>
  <div class="staff">
    <div class="staff-top">
      <el-button type="primary" class="staff-add" @click="addStaff">添加</el-button>
    </div>
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
            <el-button type="text" class="caozuo" @click="deleteById(scope.row)" size="small">删除</el-button>
            <el-button type="text" class="caozuo" @click="change(scope.row)" size="small">编辑</el-button>
            <el-button type="text" class="caozuo" @click="staff_details(scope.row.id)" size="small">详情</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="resetForm">
      <el-form :model="form" :rules="rules" ref="myform">
        <el-form-item label="员工名称" :label-width="formLabelWidth" prop="username" placeholder="请输入员工名">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入员工名" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="realname">
          <el-input v-model="form.realname" autocomplete="off" placeholder="请输入员工姓名" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" placeholder="请输入手机号" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="form.idCard" autocomplete="off" placeholder="请输入身份证号" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="bankCard">
          <el-input v-model="form.bankCard" autocomplete="off" placeholder="请输入银行卡号" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入密码" style="width:410px;"></el-input>
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
  name: 'Staff',
  data() {
    return {
      input: '',
      staffInfo: [],
      total: 0,
      currentPage1: 1,
      pageSize: 6,
      dialogFormVisible: false,
      title: '添加员工信息',
      form: {
        username: '',
        realname:'',
        telephone:'',
        idCard:'',
        bankCard:'',
        password:''
      },
      //表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入员工名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入员工名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入员工手机号'},
          { min: 7, max: 11}
        ],
        idCard: [
          { required: true, message: '请输入身份证号'},
          { min: 18, max:18 }
        ],
        bankCard: [
          { required: true, message: '请输入银行卡号'},
        ],
        password: [
          { required:true, trigger: 'blur' },
          { min: 5}
        ],
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
      this.form.idCard="",
      this.form.bankCard="",
      this.form.password=""
    },
    //给详情按钮绑定事件
    staff_details(id){
      this.$router.push({path:"/staff_detail/index",query:{id}});
    },
    //给确定按钮绑定事件
    formSave(formName) { 
      var self=this;
      //1.获取表单数据，表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //2.发送请求
          self.$axios.post("/waiter/saveOrUpdate",qs.stringify(self.form)).then((response)=>{
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
    //添加员工
    addStaff(){
      this.dialogFormVisible=true;
      this.title='添加员工信息';
      this.form={};
    },
    //编辑功能
    change(row){
      var self=this;
      this.dialogFormVisible=true;
      this.title='修改员工信息';
      this.$axios.get("waiter/findWaiterById",{
        params:{
          id:row.id
        }
      }).then((response)=>{
        //console.log(response)
        self.form={
          id:row.id,
          username: row.username,
          realname: row.realname,
          telephone:row.telephone,
          idCard:row.idCard,
          bankCard:row.bankCard,
          password:response.data.data.password
        }
      })
    },
    findAll() {
      var currentPage1 = this.currentPage1 - 1;
      var data = {
        page: currentPage1,
        pageSize: this.pageSize
      }
      this.$axios.post('/waiter/query',qs.stringify(data)).then((response) => {
        //console.log(response);
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
      var self = this;
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = row.id;
        self.$axios.get('/waiter/deleteById',{
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
    }
  }
}
</script>

<style lang="scss" scoped>
.staff-add{
  width: 56px;
  height: 32px;
  font-size: 12px;
  padding: 9px 15px;
  margin:15px;
}
.staff-bottom{
  margin-left: 20px;
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
</style>
