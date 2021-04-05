<template>
    <div id="basicInfo">
        <div class="top">
            <div class="img">
                <img :src="photo" alt="">
            </div>
            <span class="text1">{{basic.realname}}</span><br>
            <span class="text2">海纳百川,有容乃大</span>
        </div>
        <div class="bottom">
            <span class="info">联系方式:</span><span>{{basic.telephone}}</span><br>
            <span class="info">状态:</span><span>{{basic.status}}</span><br>
            <span class="info">地址:</span><span>{{basic.province}}{{basic.city}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            basic:{},
            photo:''
        }
    },
    created(){
        this.$axios.get("/customer/findCustomerById",{
            params:{
                id:this.$route.query.id
            }
        }).then((response)=>{
            //console.log(response);
            this.basic=response.data.data;
            this.photo=this.basic.imgPhoto;
        });
    }
}
</script>
<style lang="scss" scoped>
.top{
    width: 300px;
    height: 170px;
    margin: 20px 0px 40px 100px;
}
.img{
    width: 120px;
    height: 120px;
    border:1px solid rgba(204, 204, 204, 0.616);
    border-radius: 50%;
    margin-bottom: 20px;
    background-color:  rgba(204, 204, 204, 0.616);
}
.info{
    height: 30px;
    border: 1px solid white;
    line-height: 30px;
    display: inline-block;
    margin-top: 5px;
}
.text1{
    height: 30px;
    width: 120px;
    display: inline-block;
    font-size: 20px;
    text-align: center;
}
.text2{
    height: 30px;
    display: inline-block;
    font-size: 16px;
    color: rgba(104, 97, 97, 0.938);
    margin-top: 10px;
}
</style>