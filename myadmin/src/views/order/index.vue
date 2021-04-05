<template>
  <div id="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item" :name="item" v-for="item in nameList" :key="item">
        <order-table ref="msg"></order-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import orderTable from './table'

export default {
  data(){
    return {
      activeName: '所有订单',
      nameList:["所有订单","待支付","待派单","待接单","待服务","待确认","已完成"]
    }
  },
  components:{
    orderTable      //挂载
  },
  mounted(){
    this.$refs.msg[0].sendItem(this.activeName);
  },
  methods:{
    handleClick(tab, event) {
      //console.log(tab, event);
      // console.log(tab.index);
      this.$refs.msg[tab.index].sendItem(this.activeName);
    }
  }
}
</script>
<style lang="scss" scoped>
#order{
  padding: 20px;
}
</style>