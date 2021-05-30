<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="false"
      :show-right-page="false"
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"
      @filter-handle="handleFilter"
      @filter-reset-handle="handleFilter"
    >
      <!--      :filter-default-data="filterData"-->
      <!--      :filter-field-list="filterFieldList"-->
      <!--      :filter-type-option-list="listTypeInfo"-->

      <div slot="tool-bar">
        <el-tooltip v-show="isShowBtn" v-perm="'/group/add'" :content="$t('common.create')">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleCreate(0)" />
        </el-tooltip>
        <el-tooltip :content="$t('common.refresh')">
          <el-button v-waves type="primary" size="mini" icon="el-icon-refresh" @click="getList()" />
        </el-tooltip>

      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          v-loading="listLoading"
          v-col-width-limit
          :data="groupData"
          row-key="id"
          height="100%"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column :label="$t('group.name')" show-overflow-tooltip align="left" min-width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('group.description')" show-overflow-tooltip align="left" min-width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" align="left" fixed="right" width="150" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('group.addChildButton')">
                <el-button v-if="scope.row.allowAdd" v-show="!eachAssignDisabled(scope.row)" v-perm="'/group/add'" icon="el-icon-plus" size="mini" @click="handleCreate(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.edit')">
                <el-button v-show="(scope.row.pageChild || isShowBtn) && scope.row.disabled !== true" v-perm="'/group/edit'" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.delete')">
                <el-button v-show="(scope.row.pageChild || isShowBtn) && scope.row.disabled !== true" v-perm="'/group/del'" plain size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page" />
    </fleet-card-table>

    <!--创建-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('group.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('group.description')" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import group from './group.js'
export default {
  ...group
}
</script>

<style scoped>
  >>>.el-form--label-left .el-form-item__label {
    text-align: right;
  }
</style>
