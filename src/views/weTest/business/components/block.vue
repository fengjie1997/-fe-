<template>
  <div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <b>{{ name }}</b>
        </template>
        <div />

      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>

export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

      activeName: '1'
    }
  }
}
</script>

<style scoped>
</style>
