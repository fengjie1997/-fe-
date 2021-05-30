<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>

  .full-hw, .full-wh {
    height: 100%;
    width: 100%;
  }

  .scroll-auto {
    overflow:auto;
  }

  /*禁止用户选择文字，拖拽使用*/

  .card-table-disabled-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*强制修改滚动条样式*/

  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
    background-color: #F5F5F5 !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(199,201,204) !important;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px !important;
    background-color: rgba(144,147,153,.2) !important;
  }
  ::-webkit-scrollbar-track {
    background-color: #F5F5F5 !important;
  }

</style>
