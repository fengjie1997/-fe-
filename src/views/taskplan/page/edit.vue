<template>
  <div class="testplan-page-app">
    <el-collapse v-model="activeNames" accordion class="testplan-conf">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="title-icon el-icon-s-tools" />
          <span class="title-name">{{ $t('taskPlan.title.basicConfig') }}</span>
        </template>
        <div class="baseconf">
          <BaseConfView ref="baseConf" :plan-id="planId" @updatePlanId="replaceId" />
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="title-icon el-icon-setting" />
          <span class="title-name">{{ $t('taskPlan.title.portConfig') }}</span>
        </template>
        <div class="portconf">
          <PortConfView ref="portConf" :plan-id="planId" />
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-card class="testplan-box">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit" /> 基本配置2</span>
          <BaseConf ref="baseConf" :plan-id="planId" @updatePlanId="replaceId" />
        </el-tab-pane>
        <el-tab-pane :disabled="planId === null">
          <span slot="label"><i class="el-icon-setting" /> 端口配置2</span>
          <PortConf ref="portConf" :plan-id="planId" />
        </el-tab-pane>
      </el-tabs>
    </el-card> -->
  </div>
</template>

<script>
import js from './edit.js'
export default {
  ...js
}
</script>

<style lang="less">
.testplan-page-app{
  padding: 15px;
  .testplan-conf{
    .title-icon{
      color: #000000;
      font-size: 16px;
      font-weight: 500;
      padding-right: 5px;
    }
    .title-name{
      color: #000000;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>

