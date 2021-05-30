<template>
  <div class="app-container dict-management-container">
    <div class="filter-container">
      <el-input v-model="listQuery.condition" :placeholder="$t('common.fuzzySearch')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.field" clearable style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in fieldOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.isAsc" clearable style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('common.add') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleClearCache">{{ $t('common.wipeCache') }}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      height="100%"
      style="width: 100%;"
    >
      <!-- 数据 -->
      <el-table-column :label="$t('dict.id')" align="center" width="120" max-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dict.name')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dict.code')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dict.detail')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.detail }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Page -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 创建 -->
    <el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="790px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="150px" style="width: 600px; margin-left:50px;">
        <el-form-item :label="$t('dict.id')" prop="id">
          <el-input v-model="temp.id" disabled />
        </el-form-item>
        <el-form-item :label="$t('dict.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('dict.code')" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item v-for="(item,itemIndex) in temp.subDicts" :key="item.itemIndex" :label="$t('dict.children')">
          <span style="float:left;">
            <el-form-item :prop="'subDicts.'+ itemIndex + '.name'">
              <el-input v-model="item.name" :placeholder="$t('dict.name')" style="width:70px" />
            </el-form-item>
          </span>
          <span class="span_element">
            <el-form-item :prop="'subDicts.'+ itemIndex + '.code'">
              <el-input v-model="item.code" :placeholder="$t('dict.code')" style="width:70px" />
            </el-form-item>
          </span>
          <span class="span_element">
            <el-form-item :prop="'subDicts.'+ itemIndex + '.tip'">
              <el-input v-model="item.tip" :placeholder="tip" style="width:70px" />
            </el-form-item>
          </span>
          <span class="span_element">
            <el-form-item :prop="'subDicts.'+ itemIndex + '.sort'">
              <el-input v-model="item.sort" :placeholder="$t('dict.sort')" style="width:70px" />
            </el-form-item>
          </span>
          <span class="span_element">
            <!-- 此处的修改和删除是子元素，对数据的操作，而并不提交请求 -->
            <el-button size="mini" type="danger" @click="handleElementDelete(itemIndex)">{{ $t('common.delete') }}</el-button>
            <el-button size="mini" type="primary" @click="handleElementAdd(itemIndex)">{{ $t('common.add') }}</el-button>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import dict from './dict.js'
export default {
  ...dict
}
</script>
<style scoped>
  .span_element {
    float:left;padding-left:10px;
  }
  .dict-management-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .pagination-container {
    margin-top: 15px;
    padding: 0 5px;
  }
</style>
