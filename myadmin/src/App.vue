<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-table__body tr.hover-row > td,
.el-table__body tr.hover-row.el-table__row--striped > td {
  background-color: #e6f7ff;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #e6f7ff;
}
</style>
