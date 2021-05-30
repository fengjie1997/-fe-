<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName" class="admin-perm-tabs">
      <el-tab-pane :label="$t('perm.menuPermLabel')" class="admin-perm-tabs-pane" name="webFront">
        <el-table
          ref="tableName"
          :data="menuData"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          highlight-current-row
          style="width: 100%;"
          height="100%"
          row-key="id"
          default-expand-all
          border
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column align="left" :label="$t('perm.menuPermLabel')">
            <template slot-scope="scope">
              <label>{{ scope.row.name }}</label>
              <span class="mgl-10 tips-text">{{ scope.row.perm }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('perm.type')" width="180">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isMenu==1" size="mini" type="primary">{{ $t('common.menu') }}</el-button>
              <el-button v-if="scope.row.isMenu==0" size="mini" type="success">{{ $t('common.button') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" align="left">
            <template slot="header" slot-scope="scope">
              <el-button style="float:right" :name="scope" type="primary" size="mini" icon="el-icon-plus" @click="handleAddMenu(0)">{{ $t('perm.fatherAppendMenu') }}</el-button>
            </template>
            <template slot-scope="scope">
              <el-button v-if="scope.row.isMenu==1" type="primary" size="mini" icon="el-icon-plus" @click="handleAddMenu(scope.row.id)">{{ $t('common.add') }}</el-button>
              <el-button type="default" size="mini" icon="el-icon-edit" @click="handleEditMenu(scope.row)">{{ $t('common.edit') }}</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteMenuOne(scope.row.id);data.delVisible = false">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- server api mng -->
      <el-tab-pane :label="$t('perm.apiPermLabel')" class="admin-perm-tabs-pane" name="second">
        <el-table
          ref="tableNamse"
          :data="apiData"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          highlight-current-row
          style="width: 100%;"
          height="100%"
          row-key="id"
          default-expand-all
          border
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column align="left" :label="$t('common.serverPermLabel')">
            <template slot-scope="scope">
              <label>{{ scope.row.name }}</label>
              <span class="mgl-10 tips-text">{{ scope.row.perm }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.serverPermLabel')" width="180">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isCtrl==1" size="mini" type="primary">{{ $t('perm.ctrl') }}</el-button>
              <el-button v-if="scope.row.isCtrl==0" size="mini" type="success">{{ $t('perm.inter') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" align="left">
            <template slot="header" slot-scope="scope">
              <el-button style="float:right" :name="scope" type="primary" size="mini" icon="el-icon-plus" @click="handleAddApi(0)">{{ $t('perm.fatherAppendMenu') }}</el-button>
            </template>
            <template slot-scope="scope">
              <el-button v-if="scope.row.isCtrl==1" type="primary" size="mini" icon="el-icon-plus" @click="handleAddApi(scope.row.id)">{{ $t('common.add') }}</el-button>
              <el-button type="default" size="mini" icon="el-icon-edit" @click="handleEditApi(scope.row)">{{ $t('common.edit') }}</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteApiOne(scope.row.id)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- permission table -->
      <el-tab-pane :label="$t('perm.mountTableLabel')" class="admin-perm-tabs-pane" name="third">
        <el-card class="admin-perm-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-edit" :disabled="permActStatus" @click="handlePermEdit()">{{ $t('common.edit') }}</el-button>
                </el-button-group>
              </el-col>
              <el-col :span="6">
                <el-input v-model="mountFilterText" :placeholder="$t('common.filterTip')" />
              </el-col>
              <el-col :span="6">
                <el-button style="margin-left:15px" type="primary" icon="el-icon-search" size="mini">{{ $t('common.search') }}</el-button>
              </el-col>
            </el-row>
          </div>
          <el-tree
            ref="mountTree"
            :data="mountData"
            :props="menuProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            default-expand-all
            class="coustom-tree"
            @node-click="handlePermNode"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>
                <span v-if="data.isMenu===0 || data.isMenu===1" class="mgl-10" style="font-weight: bold">{{ data.name }}</span>
                <span v-if="data.isMenu===0 || data.isMenu===1" class="mgl-10 tips-text">{{ data.perm }}</span>
                <el-tag v-if="data.isCtrl===0" class="mgl-10" type="danger" size="small"><span style="font-weight: bold;margin-top: 10px">[{{ $t('perm.inter') }}] {{ data.apiName }} </span>  [{{ data.perm }}]</el-tag>
                <el-tag v-if="data.isCtrl===1" class="mgl-10" type="default" size="mini">ERROR</el-tag>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- Form [前端权限管理] [添加与修改]-->
    <el-dialog :title="$t('perm.menuAddTitle')" :visible.sync="menuDialogFormVisible" width="400px" :close-on-click-modal="false">
      <el-form :model="menuForm" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
        <el-form-item label="menuId" prop="id" hidden>
          <el-input v-model="menuForm.id" :disabled="true" />
        </el-form-item>

        <el-form-item :label="$t('perm.pid')" prop="parentId">
          <el-input v-model="menuForm.parentId" :disabled="true" />
        </el-form-item>
        <el-form-item :label="$t('perm.name')" prop="name" width="80px">
          <el-input v-model="menuForm.name" />
        </el-form-item>
        <el-form-item :label="$t('perm.perm')" prop="perm" width="80px">
          <el-input v-model="menuForm.perm" />
        </el-form-item>
        <el-form-item :label="$t('perm.type')" prop="isMenu" width="80px">
          <el-switch
            v-if="menuForm.isMenu = String(menuForm.isMenu)"
            v-model="menuForm.isMenu"
            active-color="#67C23A"
            inactive-color="#409EFF"
            active-value="0"
            inactive-value="1"
            :active-text="$t('common.button')"
            :inactive-text="$t('common.menu')"
            style="padding-left: 30px;"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="clear: both;">
        <el-button @click="menuDialogFormVisible = false">{{ this.$t('common.cancel') }}</el-button>
        <el-button v-if="menuForm._operate == 'add'" type="primary" @click="addMenuOne">{{ this.$t('common.add') }}</el-button>
        <el-button v-if="menuForm._operate == 'edit'" type="primary" @click="updateMenuOne">{{ this.$t('common.update') }}</el-button>
      </div>
    </el-dialog>
    <!-- Form [后端权限管理] [添加与修改]-->
    <el-dialog :title="$t('perm.apiAddTitle')" :visible.sync="apiDialogFormVisible" width="400px" :close-on-click-modal="false">
      <el-form :model="apiForm" label-position="left" label-width="80px" style="width: 80%; margin-left:50px;">
        <el-form-item label="id" prop="id" hidden>
          <el-input v-model="apiForm.id" :disabled="true" />
        </el-form-item>
        <el-form-item :label="$t('perm.pid')" prop="parentId">
          <el-input v-model="apiForm.parentId" :disabled="true" />
        </el-form-item>
        <el-form-item :label="$t('perm.url')" prop="apiUrl" width="80px">
          <el-input v-model="apiForm.apiUrl" />
        </el-form-item>
        <el-form-item :label="$t('perm.name')" prop="name" width="80px">
          <el-input v-model="apiForm.name" />
        </el-form-item>
        <el-form-item :label="$t('perm.perm')" prop="perm" width="80px">
          <el-input v-model="apiForm.perm" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="clear: both;">
        <el-button @click="apiDialogFormVisible = false">{{ this.$t('common.cancel') }}</el-button>
        <el-button v-if="apiForm._operate == 'add'" type="primary" @click="addApiOne">{{ this.$t('common.add') }}</el-button>
        <el-button v-if="apiForm._operate == 'edit'" type="primary" @click="updateApiOne">{{ this.$t('common.update') }}</el-button>
      </div>
    </el-dialog>
    <!--[接口挂载]-->
    <el-dialog :title="$t('perm.mountDigTitle')" :visible.sync="mountDialogFormVisible" width="50%" :close-on-click-modal="false">
      <el-card class="box-card admin-perm-card">
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="6">
              <el-input v-model="mountApiFilterText" :placeholder="$t('common.filterTip')" />
            </el-col>
            <el-col :span="6">
              <el-button style="margin-left:15px" type="primary" icon="el-icon-search" size="mini"> {{ this.$t('common.add') }} </el-button>
            </el-col>
          </el-row>
        </div>
        <el-tree
          ref="mountApiTree"
          :data="mountApiData"
          :props="apiProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          node-key="id"
          highlight-current
          default-expand-all
          show-checkbox
          class="admin-perm-tree dialog-tree"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>
              <span class="mgl-10">{{ data.name }}</span>
              <span class="mgl-10 tips-text">{{ data.perm }}</span>
              <el-tag v-if="data.isCtrl==1" class="mgl-10" type="default" size="mini">{{ $t('perm.ctrl') }}</el-tag>
              <el-tag v-else-if="data.isCtrl==0" type="success" size="mini" class="mgl-10">{{ $t('perm.inter') }}</el-tag>
            </span>
          </span>
        </el-tree>
      </el-card>

      <div slot="footer" class="dialog-footer" style="clear: both;">
        <el-button size="lg" @click="mountDialogFormVisible = false">{{ this.$t('common.cancel') }}</el-button>
        <el-button size="lg" type="primary" @click="setSelectApi(editMountMenuId)">{{ this.$t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import perm from './perm.js'
export default {
  ...perm
}
</script>
<style scoped>
  .coustom-tree {
    height: calc(100vh - 84px - 70px - 55px - 66px - 40px);
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 15px;
    height: calc(100% - 30px);
  }

  .box-card .admin-perm-tabs {
    height: calc(100vh - 84px - 70px);
  }
  .box-card .admin-perm-tabs .admin-perm-tabs-pane {
    height: calc(100vh - 84px - 70px - 53px);
  }
</style>
<style lang="scss">
  .admin-perm-card /deep/{
    height: 100%;
    display: flex;
    flex-direction: column;
    max-height: 740px;
    .el-card__body{
      max-height: 650px;
      overflow-y: scroll;
    }
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }
    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf{
      display: none;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px dashed #4386c6;
      bottom: 0px;
      height: 100%;
      top: -26px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px dashed #4386c6;
      height: 20px;
      top: 12px;
      width: 24px;
    }
  }
  .dialog-tree{
     height: 450px;
    max-height: 450px;
    .el-card__body{
      max-height: 450px;
      overflow-y: scroll;
    }
  }

</style>
