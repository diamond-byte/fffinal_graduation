<template>
    <div id="staff_details">
        <span @click="back" class="back">返回</span>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
            <el-tab-pane label="基本信息" name="first" @click="basics(this.$route.query.id)">
                <basicInfo></basicInfo>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="second">
                <orderInfo></orderInfo>
            </el-tab-pane>
            <el-tab-pane label="收益信息" name="third">
                <shouyiInfo></shouyiInfo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import basicInfo from './components/basicInfo'
import orderInfo from './components/orderInfo'
import shouyiInfo from './components/shouyiInfo'

export default {
    data() {
        return {
            activeName: 'first'
        };
    },
    components:{
        basicInfo,
        orderInfo,
        shouyiInfo
    },
    methods:{
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        back(){
            this.$router.back();
        }
    }
}
</script>
<style lang="scss" scoped>
.back{
    color: rgb(35, 117, 240);
    border: 1px solid white;
    display: inline-block;
    margin: 10px 20px;
}
.back:hover{
    cursor: pointer;
}
.tab{
    margin-left: 20px;
}
</style>