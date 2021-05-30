<template>
  <div style="height: 100%; width: 100%; overflow: auto;">
    <div style="width: 70%; margin-left: 15%;">
      <form-create v-model="modelForm" class="dl-task-form" :rule="rules" :option="options" />
    </div>
  </div>
</template>

<script>
import js from './baseConf.js'
export default {
  ...js
}
</script>
<style scoped lang="less">
  .dl-task-form /deep/ .el-select,.dl-task-form /deep/ .el-input__inner, .dl-task-form /deep/ .el-input-number--small{
    display: block;
    width: 200px;
  }
.el-collapse-item{
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0px 7px 7px -7px #5E5E5E;
}
.form-title{
  color: #5E5E5E;
  margin-left: 15px;
}
.ele-form-title{
  color: #888888;
  font-size: 0.6em;
  margin-left: 15px;
}
</style>
<style scoped>
.el-form-item__label{
  font-size: 0.8em;
  color: #5e5e5e;
  font-weight: 550px;
  padding-left: 12px;
}
.toolbar-collapse{
  width:100%;
  height:30px;
  position: relative;
  position:fixed;
}
.row-bg{
  padding: 15px 0;
}
.date-tags .el-tag{
  margin-right: 5px;
}
.baseconf-pickerdate .el-date-editor{
  width: 120px;
}
.ups-action{
  width: 200px;
}
</style>
