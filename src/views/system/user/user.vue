<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="true"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"

      @filter-handle="handleFilter"
      @left-refresh-handle="handleRefresh"
    >

      <span slot="left-title">{{ $t('common.roleList') }}</span>

      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          class="full-hw"
          :data="roleTree"
          :props="treeProps"
          :expand-on-click-node="false"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </div>
      <div slot="tool-bar">
        <el-tooltip :content="$t('common.add')">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleCreate" />
        </el-tooltip>
      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          fit
          height="100%"
          highlight-current-row
          style="width: 100%;"
        >
          <!-- 数据 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item :label="$t('user.userInfoId')">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item :label="$t('user.account')">
                  <span>{{ props.row.account }}</span>
                </el-form-item>
                <el-form-item :label="$t('user.name')">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item :label="$t('user.company')">
                  <span>{{ props.row.company }}</span>
                </el-form-item>
                <el-form-item :label="$t('user.email')">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item :label="$t('user.phone')">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item :label="$t('role.name')">
                  <span>{{ props.row.roleName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.account')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.name')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.roleName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.name')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.company')" align="left" show-overflow-tooltip min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.status')" align="left" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.disabled == '1'?$t('common.freeze'):$t('common.normal')" placement="top">
                <el-switch
                  v-show="scope.row.name!=='admin'"
                  v-if="scope.row.disabled = scope.row.disabled == true ? String(1) : String(0)"
                  v-model="scope.row.disabled"
                  active-value="0"
                  inactive-value="1"
                  @change="handleSwitch(scope.row.disabled,scope.row.id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" fixed="right" align="left" show-overflow-tooltip width="180" :resizable="false">
            <template slot-scope="scope">

              <el-tooltip :content="$t('common.edit')">
                <el-button v-if="scope.row.name!=='admin'" v-perm="'/user/edit'" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)" />
              </el-tooltip>

              <el-tooltip :content="$t('user.restPwd')">
                <el-button v-if="scope.row.name!=='admin'" v-perm="'/user/restPwd'" size="mini" @click="handleRestPwd(scope.row.id)">
                  <svg-icon icon-class="restPassword" />
                </el-button>
              </el-tooltip>

              <el-tooltip :content="$t('user.assignRole')">
                <el-button v-if="scope.row.name!=='admin'" v-perm="'/user/assignRole'" size="mini" icon="el-icon-user-solid" @click="handleAssignRole(scope.row)" />
              </el-tooltip>

              <el-tooltip :content="$t('common.delete')">
                <el-button v-if="scope.row.name!=='admin'" v-perm="'/user/del'" size="mini" plain icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)" />
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>

    </fleet-card-table>

    <!-- 创建 -->
    <el-dialog :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="600px" @close="closeTempDialog">
      <el-form ref="temp" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('user.userInfoId')" prop="id" hidden>
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" :label="$t('user.account')" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" :label="$t('user.password')" prop="password">
          <el-input v-model="temp.password" show-password />
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" :label="$t('user.reRestPwdTip')" prop="passwordTow">
          <el-input v-model="temp.passwordTow" show-password />
        </el-form-item>
        <el-form-item :label="$t('user.assignRole')" prop="timezone">

          <el-popover
            v-model="createRoleVisible"
            placement="right"
            width="320"
            trigger="manual"
          >
            <div style="height: 300px;overflow: auto">

              <el-tree
                ref="roleSelectView"
                :data="roleSelectData"
                :props="TreeProps"
                :highlight-current="true"
                accordion
                default-expand-all
              >
                <span slot-scope="{ node, data }">
                  <span>
                    <span class="mgl-10">{{ data.name }}</span>
                  </span>
                </span>
              </el-tree>
            </div>
            <div style="margin-top: 10px;">
              <el-button type="primary" @click="handleSelectRole">{{ $t('common.save') }}</el-button>
              <el-button @click="createRoleVisible = false">{{ $t('common.cancel') }}</el-button>
            </div>
            <el-button slot="reference" @click="createRoleVisible = true">{{ temp.roleName }}</el-button>
          </el-popover>

        </el-form-item>
        <el-form-item :label="$t('user.timezone')" prop="timezone">
          <el-select v-model="temp.timezone" filterable style="width: 250px">
            <el-option v-for="item in timezoneDict" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item :label="$t('user.phone')" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item :label="$t('user.name')" prop="firstName">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('user.company')" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog :title="$t('user.restPwd')" :visible.sync="restPwdFormVisible" width="600px" @close="closeTempPwdDataDialog">
      <el-form ref="tempPwdData" :rules="resetRules" label-position="left" :model="tempPwdData" label-width="150px" style="width: 400px;margin-left:50px;">
        <el-form-item :label="$t('user.restPwd')" prop="tempPwd">
          <el-input v-model="tempPwdData.tempPwd" show-password />
        </el-form-item>
        <el-form-item :label="$t('user.reRestPwdTip')" prop="restPwd">
          <el-input v-model="tempPwdData.restPwd" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restPwdFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="restPassword">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->

    <el-dialog
      :title="$t('user.assignRole')"
      :visible.sync="assignRoleFormVisible"
      width="580px"
      :close-on-click-modal="false"
    >
      <el-tree
        :data="roleSelectData"
        :props="TreeProps"
        :highlight-current="true"
        accordion
        default-expand-all
        @node-click="handleRoleTreeNodeClick"
      >
        <span slot-scope="{ node, data }">
          <span>
            <span class="mgl-10">{{ data.name }}</span>
          </span>
        </span>
      </el-tree>
      <span slot="footer">
        <span><p>{{ $t('common.currentSelect') }} : {{ assignRoleData.roleName }}</p></span>
        <el-button @click="assignRoleFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="assignRole">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import userJS from './user'
export default {
  ...userJS
}
</script>

<style scoped>

  .table-expand {
    font-size: 0;

  }
  .table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    padding-left: 40px;

  }
  .table-expand >>>.el-form-item__label {
    font-weight: bold;
  }
  >>>.el-form--label-left .el-form-item__label {
     text-align: right;
  }

  >>>.el-tree-node__content {
    font-size: 12px !important;
  }
</style>
