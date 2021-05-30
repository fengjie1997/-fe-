<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <PortListView ref="portListView" :plan-id="planId" @setSchemaId="refreshSchemaId" />
    </el-col>
    <el-col :span="18">
      <!-- <el-card class="testplan-portconf-card" /> -->
      <!-- <div slot="header" class="clearfix">
          <div class="filter-container">
            <el-menu mode="horizontal" class="filter-item task-menu" @select="addNewTask">
              <el-submenu index="" :disabled="taskGroupId === null ? true :false">
                <template slot="title">
                  <i class="el-icon-circle-plus-outline" />添加任务
                </template>
                <MenuTree :data="menuList" />
              </el-submenu>
            </el-menu>
            <el-button v-show="isSubmit" class="filter-item task-submit" size="md" type="primary" @click="refTask()">submit</el-button>
          </div>
        </div> -->
      <GroupLIstView
        ref="groupListView"
        :plan-id="planId"
        :schema-id="schemaId"
        @refreshGroupId="refreshGroupId"
        @refreshTaskId="refreshTaskId"
        @editTaskFrom="handleEditTaskFrom"
        @addtask="addNewTask"
      />
      <el-dialog
        title="配置测试任务"
        :visible.sync="dialogTaskForm"
        width="80%"
        class="task-form-dialog"
      >
        <div class="task-form-box">
          <taskForm v-if="reset" ref="taskFormss" :rules="formRule" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="md" @click="dialogTaskForm = false">取 消</el-button>
          <el-button size="md" type="primary" @click="refTask">确 定</el-button>
        </span>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script>
import js from './portConf.js'
export default {
  ...js
}
</script>
<style lang="less">
.testplan-box-card .el-card__header{

  background-color: #F8F8F8;
}
.toolbar{
  background-color: #f5f5f5;
  padding: 15px;
}
.pull-left{
  float: left
}
.pull-right{
  float: right
}
.setting-group{
  cursor: pointer;
}
.testplan-port-card .el-card__body{
  padding: 0;
  padding-bottom: 30px;
}
.strong{
  font-weight: 600
}
.el-tree{
  margin: 5px 15px;
}
.mission-detail{
  height: 550px;
}
.form-title{
  color: #5E5E5E;
}
.portform-icon-submit{
  padding-right: 20px;
}
.testplan-portconf-card{

  .el-card__header{
    padding: 0 !important;
    margin: 0 !important;
    padding: 0;
      background-color: #F8F8F8;
      .el-submenu{
        border:0;
        .el-submenu__title{
          height: 55px;
          line-height: 55px;
          :hover{
            color: rgb(31, 23, 23);
          }
        }
      }
      .is-active{
        .el-submenu__title{
          border-bottom: 0 solid #fff;
        }
      }
  }
  .el-card__body{
    width: 100%;
    padding:0;
    height: 700px;
    overflow-y: auto;
  }

}
.port-conf{
  margin-bottom: 10px;
  .el-card__header{
    background-color: #fff;
    padding: 12px 20px;
    .card-title{
      height: 29px;
      line-height: 29px;
    }
  }
}
.task-group-tree{
  margin: 5px 0;
  .el-tree-node__label{
    font-size: 14px;
  }

}
// 表单样式
.form-collapse{
  border:none;
  .el-collapse-item__wrap{
    border:none;
  }
  .el-collapse-item__header{
    border-bottom: 1px solid #fff;
  }
  .el-divider__text{
    font-weight: 700;
  }
}
// 提交表单按钮
.task-submit-btn{
  margin: 10px;
  float: right;
}
.task-form-box{
  max-height: 560px;
  overflow-y: scroll;
}
.filter-container {
  background: #fff;
  padding: 0;
  .task-menu{
    height: 56px;
    border: 0;
    margin-bottom: 0;
  }
  .task-submit{
    float: right;
    margin: 6px;
  }
}
.task-form-dialog{
  .el-dialog__body{
    padding: 20px 5px;

  }
}
</style>
