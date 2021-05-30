<template>
  <div class="taskgroup-list-view">
    <div class="toolbar">
      <div class="toolbar-item">
        <el-menu mode="horizontal" @select="addNewTask">
          <el-submenu index="" class="task-menu-title">
            <template slot="title">
              <span><i class="el-icon-plus" style="margin-top: -2px;" />{{ $t('taskPlan.label.addTask') }}</span>
            </template>
            <MenuTree :data="menuList" />
          </el-submenu>
        </el-menu>
      </div>
      <div>
        <el-button
          icon="el-icon-plus"
          type="primary"
          :disabled="schemaId === null ? true :false"
          @click="handleGroupAdd()"
        >
          {{ $t('taskPlan.label.addTaskGroup') }}
        </el-button>
      </div>
    </div>
    <el-table
      ref="taskListTable"
      v-col-width-limit
      :data="taskGroup"
      style="width: 100%;"
      row-key="id"
      height="100%"
      border
      highlight-current-row
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      header-row-class-name="task-group-row"
      :header-cell-class-name="getHeaderCellClassName"
      @row-contextmenu="rowContextmenu"
      @row-click="handleRowClick"
      @row-dblclick="handleEditFormShow"
      @current-change="handleTaskGroupChange"
    >
      <el-table-column
        prop="province"
        :label="$t('taskPlan.label.groupOrTaskName')"
        min-width="260"
        fixed
      >
        <template slot-scope="scope">
          {{ scope.row.groupName }}{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        :label="$t('taskPlan.label.executionTimePeriod')"
        width="160"
        min-width="160"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.hasOwnProperty('taskExecuteDurations')">
            <span v-for="(item, idx) in scope.row.taskExecuteDurations" :key="idx"> {{ item.startTime +' - '+item.duration }} <br></span>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('taskPlan.label.executionTimes')"
        width="120"
        min-width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.groupRepeatCount }}
          {{ scope.row.taskRepeatCount }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('taskPlan.label.synchronizationTimeWindow')" min-width="200" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.hasOwnProperty('allModuleSync')">
            {{ scope.row.allModuleSync === 1 ? 'yes' : 'no' }}
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        width="240"
        min-width="240"
        :label="$t('taskPlan.label.connectionMode')"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.hasOwnProperty('buildOnlyOnePpp')">
            {{ scope.row.buildOnlyOnePpp === 1 ? $t('loginLog.connect') : $t('loginLog.disconnect') }}
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :prop="$t('common.actions')" :label="$t('common.actions')" width="83" fixed="right">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.edit')">
            <el-button icon="el-icon-edit" @click.stop.native="handleEditFormShow(scope.row, scope.$index)" />
          </el-tooltip>
          <el-tooltip :content="$t('common.delete')">
            <el-button type="danger" plain icon="el-icon-delete" @click.stop.native="delTaskGroup(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <context-button v-if="menuVisible" ref="contextbutton" :model="model" @foo="foo" @handleMoveUp="handleMoveUp" @handleMoveDown="handleMoveDown" />
    <!-- add group -->
    <el-dialog
      :title="$t('taskPlan.label.addTaskGroup')"
      :visible.sync="addDialogVisible"
      width="840px"
      :close-on-click-modal="false"
    >
      <groupForm ref="groupFrom" :form="groupForm" @setGroupForm="setGroupForm" />
      <span slot="footer" class="dialog-footer">
        <el-button size="md" @click="addDialogVisible = false, getGroupList(schemaId)">{{ $t('common.cancel') }}</el-button>
        <el-button size="md" type="primary" @click="onSubmitGroupForm()">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import js from './group.js'
export default {
  ...js
}
</script>
<style scoped>
  .taskgroup-list-view {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .taskgroup-list-view .toolbar {
    padding: 10px;
    border: 1px solid #EBEEF5;
    border-bottom: 0;
    display: flex;
  }

  .taskgroup-list-view .toolbar .toolbar-item:first-child {
    margin-right: 10px;
  }

  .el-table >>> .el-table__body .el-button,
  .el-table >>> .el-table__body .el-button--mini {
    padding: 5px;
  }

  #app .taskgroup-list-view .toolbar >>> .task-menu-title .el-submenu__title{
    padding: 0 15px 0 10px !important;
  }

</style>
<style lang="less" scoped>
  .task-menu-title {
    /deep/ .el-submenu__title{
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
      font-weight: 500;
      font-size: 12px;
      border-radius: 3px;
      margin-top: 6px;
      i{
        color: #fff;
      }
      span{
        i{
          font-size: 12px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    /deep/ .el-submenu__title {
      margin-top: 0;
    }
  }
  .el-menu--horizontal {
    /deep/ .el-submenu__title {
      height: 29px;
      line-height: 29px;
      border: 1px solid #DCDFE6;
    }
  }
  .el-menu .el-submenu {
    /deep/ .el-submenu__title{
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
    }
  }
  .el-menu .is-opened {
    /deep/ .el-submenu__title{
      color: #FFF;
      background-color: #61B0FE;
      border-color: #61B0FE;
    }
  }
</style>

