<template>
  <div>
    <!-- <el-button @click="onTest()">click</el-button> -->
    <div id="map" style="height: calc(100vh - 150px); width: 100%" />
  </div>
</template>
<script>
import js from './stationMap'
export default {
  ...js
}
</script>
