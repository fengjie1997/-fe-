<template>
  <div>
    <el-select v-model="value" :placeholder="$t('analyze.placeholder.select')" @change="change">
      <!-- <el-select v-model="value" :placeholder="i18n.t('analyze.placeholder.select')" @change="change"> -->
      <el-option
        v-for="item in tableData"
        :key="item.code"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <div ref="myChart" :style="{ width: '500px', height: '400px'}" />
  </div>

</template>
<script>

import js from './index.js'
export default {
  ...js
}
</script>

