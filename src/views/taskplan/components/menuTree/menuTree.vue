<template>
  <div class="menutree">
    <span v-for="(menu, idx) in data" :key="menu.value + idx">
      <el-submenu v-if="menu.children" :index="menu.value">
        <template slot="title">
          <span>{{ menu.name }}</span>
        </template>
        <span>
          <menutree :data="menu.children" />
        </span>
      </el-submenu>
      <el-menu-item v-else :index="menu.value">
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Menutree',
  props: {
    data: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>
