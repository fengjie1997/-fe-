<template>
  <div class="full-hw">
    <fleet-card-table
      @left-refresh-handle="handleRefresh"
    >
      <span slot="left-title">{{ $t('common.groupList') }}</span>
      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          ref="deviceTree"
          :data="treeData"
          :props="deviceProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />
      </div>
      <div slot="right" class="right-card">
        <!-- 设备监控：概况 -->
        <el-tabs type="border-card" @tab-click="handleTabClick">
          <el-tab-pane :label="$t('device.summary')">
            <Summary v-if="select==='summary'" ref="summary" :model="model" class="tab-pane" />
          </el-tab-pane>
          <!-- 设备监控:设备状态 -->
          <el-tab-pane :label="$t('device.deviceStatus')" class="tab-pane">
            <DeviceStatus v-if="select==='deviceStatus'" ref="deviceStatus" :model="model" class="tab-pane" />
          </el-tab-pane>
          <!-- 设备监控:告警详情 -->
          <el-tab-pane :label="$t('device.alarmDetails')" class="tab-pane">
            <AlarmDetails v-if="select==='alarmDetails'" ref="alarmDetails" :model="model" class="tab-pane" />
          </el-tab-pane>
          <el-tab-pane :label="$t('device.eventDetails')" class="tab-pane">
            <EventDetails v-if="select==='eventDetails'" ref="eventDetails" :model="model" class="tab-pane" />
          </el-tab-pane>
          <el-tab-pane :label="$t('device.loginLog')" class="tab-pane">
            <LoginLog v-if="select==='loginLog'" ref="loginLog" :model="model" class="tab-pane" />
          </el-tab-pane>
          <el-tab-pane :label="$t('device.stateStatistics')" class="tab-pane">
            <StateStatistics v-if="select==='stateStatistics'" ref="stateStatistics" :model="model" class="tab-pane" />
          </el-tab-pane>
          <!--            <el-tab-pane label="MOS">-->
          <!--              <MOS v-if="select==='mos'" ref="mos" :model="model" />-->
          <!--            </el-tab-pane>-->
          <el-tab-pane :label="$t('device.trajectory')" class="tab-pane">
          <!-- <Trajectory v-if="select==='trajectory'" ref="trajectory" :model="model" /> -->
          </el-tab-pane>
          <el-tab-pane :label="$t('device.deviceLog')" class="tab-pane">
            <DeviceLog v-if="select==='deviceLog'" ref="deviceLog" :model="model" class="tab-pane" />
          </el-tab-pane>
        <!--            <el-tab-pane label="LiteProbe设备监控">-->
        <!--              <LiteProbe v-if="select==='liteProbe'" ref="liteProbe" :model="model" />-->
        <!--            </el-tab-pane>-->
        </el-tabs>
      </div>
    </fleet-card-table>
  </div>
</template>
<script>
import indexJs from './index'
export default {
  ...indexJs
  // methods:{
  //   jump(){
  //     window.console.log('haved run ')
  //   }
  // }
}
</script>
<style scoped>
  .right-card, .right-card >>> .el-tabs, .right-card .el-tabs >>> .el-tab-pane {
    height: 100%;
  }
  .right-card .el-tabs >>> .el-tabs__content {
    padding: 0;
    height: calc(100% - 39px);
  }
</style>
