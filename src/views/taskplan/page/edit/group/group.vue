<template>
  <div class="taskgroup-list-view">
    <el-table
      :data="taskGroup"
      style="width: 100%"
      row-key="id"
      height="600"
      border
      highlight-current-row
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      header-row-class-name="task-group-row"
      @current-change="handleTaskGroupChange"
    >
      <el-table-column prop="name" label="任务组">
        <template slot="header" slot-scope="scope">
          <el-menu mode="horizontal" class="filter-item task-menu" :test="scope" @select="addNewTask">
            <el-submenu index="" :disabled="taskGroupId === null ? true :false">
              <template slot="title">
                <i class="el-icon-circle-plus-outline" />添加任务
              </template>
              <MenuTree :data="menuList" />
            </el-submenu>
          </el-menu>
        </template>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" icon="el-icon-plus" :name="scope.row" circle :disabled="schemaId === null ? true :false" @click="addDialogVisible = true" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click.stop.native="handleEditFormShow(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click.stop.native="delTaskGroup(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- add group -->
    <el-dialog
      title="添加任务组"
      :visible.sync="addDialogVisible"
      width="60%"
    >
      <groupForm ref="groupFrom" :form="groupForm" @setGroupForm="setGroupForm" />
      <span slot="footer" class="dialog-footer">
        <el-button size="md" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="md" type="primary" @click="onSubmitGroupForm()">确认提交</el-button>
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
<style>
.taskgroup-list-view table tbody tr{
  cursor: pointer;
}
</style>
<style lang="less">
tr.task-group-row{
  th{
    padding: 0;
    div.cell{
      ul.task-menu{
        li{
          height: 45px;
          line-height: 45px;
        }
        bottom: 0;
        li.el-submenu{
          border-bottom:0;
        }
        li.is-active{
          border-bottom:0;
        }
      }
    }
  }
}

</style>
<style>
  .task-group-row .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border: none;
    height: 45px;
    line-height: 45px;
  }
  .task-group-row .el-menu--horizontal>.el-submenu .el-submenu__title{
    border: none;
    height: 45px;
    line-height: 45px;
  }
  .task-group-row .el-menu.el-menu--horizontal{
    border: 0;
  }
</style>
