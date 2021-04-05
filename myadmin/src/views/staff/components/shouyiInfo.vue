<template>
    <div id="shouyiInfo">
        <el-table :data="shouyi" stripe>
            <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="money" label="金额" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" align="center"></el-table-column>
            <el-table-column prop="transferAccounts" label="凭证" align="center"></el-table-column>
       </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            shouyi:[]
        }
    },
    created(){
        var self=this;
        this.$axios.get("/waiter/detailsShou",{
            params:{
                id:this.$route.query.id
            }
        }).then((response)=>{
            //console.log(response);
            self.shouyi=response.data.data;
        })
    }
}
</script>
<style lang="scss" scoped>
#shouyiInfo{
    margin-right: 20px;
}
</style>