<template>
  <form-create ref="refs" v-model="modelForm" :rule="rules" :option="options" class="dl-task-form" @on-submit="onSubmit" @mounted="onMounted" />
</template>
<script>

import js from './index.js'
export default {
  ...js
}
</script>

<style lang="less">
  .dl-task-form{
      width:100%;
      .el-row{
        width: 100%;
      }
    }
</style>
