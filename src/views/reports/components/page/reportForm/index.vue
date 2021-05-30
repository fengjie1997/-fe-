<template>
  <div>
    <div v-if="scene.dataSourceType === 'SJDL_DEFAULT_DATABASE'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="margin-top: 20px">
        <el-form-item :label="$t('report.area')" prop="city">
          <el-select v-model="ruleForm.city" :placeholder="$t('report.selectCity')">
            <el-option-group
              v-for="group in areaList"
              :key="group.id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.date')" prop="startDateTime">
          <el-date-picker
            v-model="rangeDatetime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="-"
            :start-placeholder="$t('common.startPlaceholder')"
            :end-placeholder="$t('common.endPlaceholder')"
          />
        </el-form-item>
      </el-form>
    </div>

    <el-collapse v-else v-model="activeNames">
      <el-collapse-item name="1" :title="$t('report.dataSource')">
        <DataSourceView ref="datasourceView" />
      </el-collapse-item>
      <el-collapse-item name="2" :title="$t('report.fileList')">
        <DataFileView ref="fileView" :source-group-id="sourceGroupId" @sources="handleSourceList" />
      </el-collapse-item>

      <el-collapse-item name="3" :title="$t('report.conditionFilter')">
        <DataFilterView ref="filterView" />
      </el-collapse-item>
      <el-collapse-item name="4" :title="$t('report.conditionGroup')">
        <GroupFilterView ref="groupFilterView" />
      </el-collapse-item>

    </el-collapse>

  </div>
</template>

<script>
import js from './index.js'
export default {
  ...js
}
</script>
<style scoped>
  .input-name {
    width:30%;
    padding: 10px 10px 10px 10px;
  }
  .report-form-top{
    padding:15px 0;
  }
</style>
