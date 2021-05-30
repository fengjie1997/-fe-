<template>
  <el-card class="app-container testplan-box">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane class="tab-pane">
        <span slot="label"><i class="el-icon-edit" /> {{ $t('taskPlan.title.basicConfig') }} </span>
        <BaseConf ref="baseConf" class="tab-pane" :plan-id="planId" @updatePlanId="replaceId" />
      </el-tab-pane>
      <el-tab-pane class="tab-pane" :disabled="planId === null">
        <span slot="label"><i class="el-icon-setting" />{{ $t('taskPlan.title.portConfig') }}</span>
        <PortConf ref="portConf" :plan-id="planId" class="port-config" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import js from './addPlan.js'
export default {
  ...js
}
</script>

<style lang="less">
.testplan-box{
  height: 100%;
  width: 100%;
  .tabs {
    height: calc(100vh - 84px - 30px);
    .tab-pane {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 84px - 99px);
      .port-config {
        height: calc(100vh - 84px - 99px);
        display: flex;
      }
    }
  }
  .el-card__header{
    padding: 10px 15px;
  }
  .el-card__body{
    padding: 0;
    .el-tabs--border-card{
      border: 0;
    }
  }
}
.plan-conf-toolbar{
  clear: both;
  .device-name{
    height: 40px;
    line-height: 40px;
    color: #409EFF
  }
  .plan-submit{
    float: right ;
  }
}
</style>

