<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="false"
      :show-right-page="false"
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"

      @filter-handle="handleFilter"
      @filter-reset-handle="handleReset"
      @left-refresh-handle="handleRefresh"
    >

      <div slot="tool-bar">
        <el-tooltip :content="$t('common.add')">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleCreate(null)" />
        </el-tooltip>
      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          row-key="id"
          border
          fit
          highlight-current-row
          height="100%"
          style="width: 100%;"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column :label="$t('role.name')" align="left" min-width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.description')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.company')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.department')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.department }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.deptLevel')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.deptLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" fixed="right" align="left" show-overflow-tooltip width="180" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('role.addChildRole')">
                <el-button v-perm="'/role/add'" icon="el-icon-plus" size="mini" @click="handleCreate(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.edit')">
                <el-button v-if="scope.row.id !==1" v-perm="'/role/edit'" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('role.assignPerm')">
                <el-button v-if="scope.row.id !== 1 && (isShowMenu || isShowArea || isShowCell|| isShowProjects)" icon="el-icon-user-solid" size="mini" @click="handleAssign(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.delete')">
                <el-button v-if="scope.row.id !==1" v-perm="'/role/del'" plain size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)" />
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>
      </div>

    </fleet-card-table>

    <!-- 创建 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="$t('role.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('role.description')" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item :label="$t('role.company')" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item :label="$t('role.department')" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item :label="$t('role.deptLevel')" prop="deptLevel">
          <el-input v-model="temp.deptLevel" />
        </el-form-item>
        <!-- <el-form-item :label="$t('role.roleLevel')" prop="roleLevel">
          <el-select v-model="temp.roleLevel">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>

        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限界面 -->
    <el-dialog v-if="dialogAssignFormVisible" :title="textMap[dialogStatus]" :visible.sync="dialogAssignFormVisible">
      <div style="height: 520px;overflow-y:scroll">
        <el-col v-show="isShowMenu" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('role.assignMenuPerm') }}</span>
            </div>
            <el-input v-model="menuFilterText" :placeholder="$t('common.filterTip')" />
            <div class="tree">
              <el-tree ref="menuTree" :data="menuData" :props="defaultProps" :filter-node-method="filterNode" :expand-on-click-node="false" show-checkbox default-expand-all node-key="id" class="coustom-tree" style="overflow-y:scroll">
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>
                    <span class="mgl-10 tree-label">{{ language === 'zh' || language === 'tw' ? data.name : data.nameEh }}</span>
                    <span class="mgl-10 tips-text">{{ data.perm }}</span>
                    <el-tag v-if="data.isMenu==1" class="mgl-10" type="default" size="mini">{{ $t('common.menu') }}</el-tag>
                    <el-tag v-else-if="data.isMenu==0" type="success" size="mini" class="mgl-10">{{ $t('common.button') }}</el-tag>
                  </span>
                </span>
              </el-tree>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-tabs type="border-card" class="coustom-tab-card">
            <el-tab-pane v-show="isShowProjects" :label="$t('common.projectGroup')">
              <div v-show="isShowProjects" class="tree" style="width:100%;height:440px">
                <el-tree
                  v-show="isShowProjects"
                  ref="projectGroupTree"
                  :data="groupData"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  :expand-on-click-node="false"
                  check-strictly
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  class="coustom-tree"
                  @check-change="currentChange"
                >
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>
                      <span class="mgl-10 tree-label">{{ data.name }}</span>
                      <!-- <span class="mgl-10 tips-text">{{ data.name }}</span> -->
                      <el-tag v-if="data.isMenu==1" class="mgl-10" type="default" size="mini">{{ $t('common.menu') }}</el-tag>
                      <el-tag v-else-if="data.isMenu==0" type="success" size="mini" class="mgl-10">{{ $t('common.button') }}</el-tag>
                    </span>
                  </span>
                </el-tree>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="isShowArea" :label="$t('common.area')"> <div v-show="isShowArea" class="tree" style="width:100%;height:440px">
              <el-tree
                v-show="isShowArea"
                ref="areaTree"
                :data="areaData"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                :default-checked-keys="areaDataTrue"
                check-strictly
                show-checkbox
                node-key="id"
                default-expand-all
                class="coustom-tree"
                @check-change="currentChange"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>
                    <span class="mgl-10 tree-label">{{ data.name }}</span>
                    <!-- <span class="mgl-10 tips-text">{{ data.name }}</span> -->
                    <el-tag v-if="data.isMenu==1" class="mgl-10" type="default" size="mini">{{ $t('common.menu') }}</el-tag>
                    <el-tag v-else-if="data.isMenu==0" type="success" size="mini" class="mgl-10">{{ $t('common.button') }}</el-tag>
                  </span>
                </span>
              </el-tree>
            </div>
            </el-tab-pane>
            <el-tab-pane v-if="isShowCell" :label="$t('common.cellGroup')"><div v-show="isShowCell" class="tree" style="width:100%;height:440px">
              <el-tree
                v-show="isShowCell"
                ref="cellTree"
                :data="cellData"
                :props="defaultPropsCell"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                :default-checked-keys="cellDataTrue"
                show-checkbox
                node-key="city"
                default-expand-all
                class="coustom-tree"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>
                    <span v-if="typeof data.city==='number'" class="mgl-10 tree-label">{{ data.province }}</span>
                    <span v-if="typeof data.city!=='number'" class="mgl-10 tree-label">{{ data.city }}</span>
                    <!-- <span class="mgl-10 tips-text">{{ data.name }}</span> -->
                    <el-tag v-if="data.isMenu==1" class="mgl-10" type="default" size="mini">{{ $t('common.menu') }}</el-tag>
                    <el-tag v-else-if="data.isMenu==0" type="success" size="mini" class="mgl-10">{{ $t('common.button') }}</el-tag>
                  </span>
                </span>
              </el-tree>
            </div></el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAssignFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="assignMenu">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import roleJS from './role'
export default {
  ...roleJS
}
</script>

<style scoped>
  .tree {
    overflow-y: auto;
    overflow-x: scroll;
    /* width: 80px;
    height: 500px; */
    background-color: #ffffff;
  }
  .el-tree {
    min-width: 100%;
    display: inline-block !important;
  }
  .el-tree-node > .el-tree-node__children {
    overflow: visible;
  }
  .coustom-tree {
    margin-top: 10px;
    height: 370px;
  }
  .coustom-tab-card {
    width: 95%;
    margin-left: 10px;
    height: 515px;
  }
  .tree-label {
    font-weight: bold;
    margin-left: 8px;
  }
  .role-management-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  >>>.el-form--label-left .el-form-item__label {
    text-align: right;
  }
</style>
