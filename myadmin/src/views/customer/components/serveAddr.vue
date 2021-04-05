<template>
    <div id="serveAddr">
        <el-table :data="address" stripe>
            <el-table-column prop="id" label="编号" align="center"></el-table-column>
            <el-table-column prop="province" label="省" align="center"></el-table-column>
            <el-table-column prop="city" label="市" align="center"></el-table-column>
            <el-table-column prop="area" label="区/县" align="center"></el-table-column>
            <el-table-column prop="address" label="街道" align="center"></el-table-column>
            <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            address:[]
        }
    },
    created(){
        var self=this;
        this.$axios.get("/address/findByCustomerId",{
            params:{
                id:this.$route.query.id
            }
        }).then((response)=>{
            //console.log(response);
            self.address=response.data.data;
        })
    }
}
</script>
<style lang="scss" scoped>
#serveAddr{
    // margin-left: 20px;
    margin-right: 20px;
}
</style>