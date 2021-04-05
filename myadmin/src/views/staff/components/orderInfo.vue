<template>
    <div id="orderInfo">
       <el-table :data="orderTimeList" stripe>
            <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
            <el-table-column prop="total" label="总价" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID" align="center"></el-table-column>
            <!-- <el-table-column label="操作" align="center" color="lightblue" class="caozuo">
                <template slot-scope="scope">
                    <el-button type="text" @click="details(scope.row.id)" size="small">详情</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- <el-pagination
            class="pageNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination> -->
    </div>
</template>
<script>
import qs from 'querystring'
export default {
    data(){
        return {
            orderList:[],
            total: 1000,
            currentPage1: 1,
            pageSize: 6
        }
    },
    computed:{
        orderTimeList:function(){
            this.orderList.forEach((item)=>{
                item.orderTime=new Date(item.orderTime).toLocaleDateString();
                //console.log(item.orderTime);
            })
            return this.orderList;
        }
    },
    created() {
        this.findAll();
    },
    methods:{
        //给详情按钮绑定事件
        details(id){
            //alert(id);
            this.$router.push({path:"/staffOrderdetail/index",query:{id}});
        },
        findAll() {
             var currentPage1 = this.currentPage1 - 1;
            var data = {
            page: currentPage1,
            pageSize: this.pageSize,
            customerId:this.$route.query.id
            }
            this.$axios.get('/order/query',qs.stringify(data)).then((response) => {
                //console.log(response.data);
                this.orderList = response.data.data;
                this.total=response.data.data.total;
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
    }
}
</script>
<style lang="scss" scoped>
#orderInfo{
//   margin-left: 20px;
  margin-right:20px;
.caozuo{
  display: inline-block;
  color: #1890ff;
  font-size: 12px;
  margin-left: 10px;
}
}
</style>