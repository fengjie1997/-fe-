<template>
  <div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <b>{{ name }}</b>
        </template>
        <div>
          <!-- 这里面应该预留几个插槽 -->
          <el-form>
            <el-row v-for="(row, idx) in rows" :key="idx">
              <el-col v-for="(param, index) in row.columns" :key="index" :span="row.span">
                <div>
                  <el-form-item class="form-half" :label="param.label">
                    <!-- 输入框 -->
                    <el-input v-if="param.type==='text'" v-model="model[param.model]" style="width: auto" />
                    <!-- 多行 -->
                    <el-input v-if="param.type==='textarea'" v-model="model[param.model]" type="textarea" :autosize="param.autosize" />

                    <!-- 字典选择 -->
                    <el-select v-if="param.type==='dict'" v-model="model[param.model]" clearable filterable collapse-tags>
                      <el-option v-for="item in param.dict" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>

                    <!-- 单选框 -->
                    <el-radio-group v-if="param.type==='radio'" v-model="model[param.model]">
                      <el-radio :label="param.value">{{ param.text }}</el-radio>
                    </el-radio-group>

                    <!-- 多选框 -->
                    <el-checkbox-group v-if="param.type==='check'" v-model="model[param.model]">
                      <el-checkbox :label="param.value">{{ param.text }}</el-checkbox>
                    </el-checkbox-group>

                    <!-- 计数器 -->
                    <el-input-number v-if="param.type==='number'" v-model="model[param.model]" :min="param.min" :max="param.max" :label="text" />

                    <!-- 日期 -->
                    <el-date-picker v-if="param.type==='beginTime'" v-model="model[param.model]" type="datetime" placeholder="选择日期时间" :default-value="defaultBeginTime" />
                    <el-date-picker v-if="param.type==='endTime'" v-model="model[param.model]" type="datetime" placeholder="选择日期时间" :default-value="defaultEndTime" />

                  </el-form-item>

                  <!-- 开关 -->
                  <el-switch v-if="param.type==='switch'" v-model="model[param.model]" :active-text="param.activeText" :inactive-text="param.inactiveText" />
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>

import { getTimeZone } from '@/utils/timeZone.js'
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    name: {
      name: String,
      required: true
    }
  },
  data() {
    return {
      defaultBeginTime: getTimeZone(this.$store.getters.timezone),
      defaultEndTime: getTimeZone(this.$store.getters.timezone),
      activeName: '1'
    }
  }
}
</script>

<style scoped>
</style>
