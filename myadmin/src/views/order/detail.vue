<template>
    <div id="orderDetails">
        <span @click="back" class="back">返回</span>
        <div class="detail">
            <span>订单编号:</span><span>{{order2.id}}</span>
        </div>
        <div class="detail">
            <span>下单时间:</span><span>{{order2.orderTime}}</span>
        </div>
        <div class="detail">
            <span>订单状态:</span><span>{{order2.status}}</span>
            </div>
        <div class="detail">
            <span>员工编号:</span><span>{{order2.waiterId}}</span>
        </div>
        <div class="detail">
            <span>顾客:</span><span>{{order2.customer.username}}</span>
        </div>
        <div class="detail">
            <span>顾客手机号:</span><span>{{order2.customer.telephone}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            order:{}
        }
    },
    computed:{
        order2:function(){
            this.order.orderTime=new Date(this.order.orderTime).toLocaleDateString();
            return this.order;
        }
    },
    created(){
        var self =this;
        this.$axios.get("/order/findById",{
            params:{
                id:self.$route.query.id
            }
        }).then((response)=>{
            console.log(response);
            this.order=response.data.data;
        })
    },
    methods:{
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
.detail{
    margin-left: 20px;
    height: 40px;
    line-height: 40px;
}
.detail>span:first-child{
    display: inline-block;
    margin-right: 10px;
}
</style>