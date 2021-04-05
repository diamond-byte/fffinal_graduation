<template>
  <div class="product">
    <div class="pro-top">
      <el-row>
        <el-col :span="18">
             <el-button type="primary" class="pro-add" @click="addPro" size="small">添加</el-button>
        </el-col>
        <el-col :span="6">
           <el-input v-model="input" class="pro-sousuo" placeholder="请输入内容" clearable></el-input>
           <el-button class="pro-find" @click="search" size="small" >查询</el-button>
        </el-col>
      </el-row>
        </div>
    <div class="pro-bottom">
      <el-table :data="proInfo" stripe>
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" align="center"></el-table-column>
        <el-table-column prop="description" label="产品描述" align="center"></el-table-column>
        <el-table-column prop="category.name" label="所属产品" align="center"></el-table-column>
        <el-table-column label="操作" align="center" color="lightblue" class="caozuo">
          <template slot-scope="scope">
            <el-button type="text" class="caozuo deleteById" @click="deleteById(scope.row)">删除</el-button>
            <el-button type="text" class="caozuo" @click="change(scope.row)">编辑</el-button>
            <el-button type="text" class="caozuo" @click="details(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pro-footer">
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
        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="form.price" autocomplete="off" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择所属栏目" style="width:410px;">
            <el-option :label="item.name" :value="item.id" v-for="item in categoryInfo" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc" style="width:410px;"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary">点击上传</el-button><br>
          <span style="font-size:12px">&nbsp;&nbsp;&nbsp;只能上传jpg/png文件，且不超过500kb</span>
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
import qs from 'querystring';

export default {
  name: 'Product',
  data() {
    return {
      input: '',
      proInfo: [],
      total: 1000,
      currentPage1: 1,
      pageSize: 6,
      //cateInfo: [],
      dialogFormVisible: false,
      title: '添加产品信息',
      categoryInfo: [],
      form: {
        name: '',
        categoryId: '',
        price: "",
        desc: ''
      },
      //表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不能为空'},
          { type: 'number', message: '价格必须为数字值'}
        ],
        categoryId: [
          { required: true, message: '请选择所属栏目', trigger: 'change' }
        ]
      },
      formLabelWidth: '180px'
    }
  },
  computed: {
    // proList:function() {
    //   var self = this;
    //   var filterList = [];
    //   //1.获取所有产品信息
    //   //console.log(this.proInfo);
    //   //2.获取所有栏目信息
    //   //console.log(this.cateInfo);
    //   //3.用一个产品的id匹配所有栏目的id，找到对应的栏目id，将对应的栏目名赋给proList
    //   this.proInfo.forEach((item) => {
    //     //item->产品对象  item.categoryId
    //     for(var i = 0;i<this.cateInfo.length;i++){
    //       //cateInfo[i] 栏目信息
    //       if(item.categoryId==self.cateInfo[i].id){
    //         //console.log(self.cateInfo[i]);
    //         item.categoryName=self.cateInfo[i].name;
    //         filterList.push(item);
    //       }
    //     }
    //   })
    //   return filterList;
    // }
  },
  created() {
    // this.findAllCategory().then(response => {
    //   this.cateInfo = response.data.data;
    this.findAllCategory();
    this.findAll();
    // });
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
      this.form.name="",
      this.form.price="",
      this.form.categoryId=""
    },
    //给详情按钮绑定事件
    details(id){
      //alert(id);
      this.$router.push({path:"/details/index",query:{id}});
    },
    //给确定按钮绑定事件
    formSave(formName) {
      var self=this;
      //1.获取表单数据，表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //2.发送请求
          self.$axios.post("/product/saveOrUpdate",qs.stringify(self.form)).then((response)=>{
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
    //添加功能
    addPro(){
      this.dialogFormVisible = true;
      this.title = '添加产品信息';
      this.form ={};
    },
    //编辑功能
    change(row){
      this.dialogFormVisible = true;
      this.title = '编辑产品信息';
      this.form={
        id:row.id,
        name:row.name,
        price:row.price,
        categoryId:row.categoryId,
        desc:row.description
      }
    },
    //查询按钮功能
    search() {
      //获取用户输入
      //如果搜索输入框中有内容，表示搜索功能，传参name
      if(this.input){          //input为查询输入框中的内容
        this.findAll(this.input);
      }else{      //否则为空，查询所有，不传参
        this.findAll();
      }
    },
    //封装查询所有栏目的函数
    // findAllCategory() {
    //   return this.$axios.get("/category/findAll");
    // },
    findAllCategory() {
      return this.$axios.get("/category/findAll").then((response)=>{
        //console.log(response);
        this.categoryInfo = response.data.data;
      });
    },
    findAll(name) {
      if(name){
        //点击搜索
        var currentPage1 = this.currentPage1-1;
        var data = {
          page: currentPage1,
          pageSize:this.pageSize,
          name:name
        }
      }else{
        //非搜索
        var currentPage1 = this.currentPage1-1;
        var data = {
          page: currentPage1,
          pageSize:this.pageSize
        }
      }
      this.$axios.post('/product/queryProductCascadeCategory',qs.stringify(data)).then((response) => {
        //console.log(response);
        this.proInfo = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    //分页查询封装函数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.findAll();
    },
    //根据id删除数据
    deleteById(row) {
      var self = this;
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = row.id;
        self.$axios.get('/product/deleteById',{
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
.product{
  width: 100%;
  margin-right:50px;
  .pro-add{
  width: 56px;
  height: 32px;
  font-size: 12px;
  padding: 9px 15px;
  margin:15px;
}
.pro-sousuo{
  width: 200px;
  height: 40px;
  margin: 18px 10px;
}
.pro-find{
  width: 56px;
  height: 32px;
  font-size: 12px;
  padding: 9px 15px;
  color:#1890ff;
  border-color: #1890ff;
}
.pro-bottom{
  margin-left: 20px;
  margin-right:20px;
}
.caozuo{
  display: inline-block;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
.pro-footer{
  margin: 10px 20px;
}
}

</style>
