<template>
    <div id="proDetails">
        <span @click="back" class="back">返回</span>
        <div class="detail">
            <span>产品名称:</span><span>{{product.name}}</span>
        </div>
        <div class="detail">
            <span>产品价格:</span><span>{{product.price}}</span>
        </div>
        <div class="detail">
            <span>产品描述:</span><span>{{product.description}}</span>
            </div>
        <div class="detail">
            <span>产品主图:</span><img :src="photo" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            product:{},
            photo:''
        }
    },
    created(){
        var self=this;
        this.$axios.get("/product/findById",{
            params:{
                id:self.$route.query.id
            }
        }).then((response) => {
            console.log(response.data.data);
            self.product=response.data.data;
            self.photo=response.data.data.photo;
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