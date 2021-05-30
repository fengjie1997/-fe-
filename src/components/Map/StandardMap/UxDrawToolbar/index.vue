<template>
  <div class="ux-draw-toolbar-container" :style="{ top: vertical }">
    <div v-for="(btn, index) in buttons" :key="index" :class="{ 'ux-draw-button-container': true, active: btn.active }" @click="handleBtnClick(index)">
      <a class="control-button">
        <div :title="btn.title" :class="['item-icon', btn.icon]" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vertical: '228px',
      buttons: [
        { label: 'I', title: 'Property', active: false, icon: 'info' },
        { label: 'S', title: 'Save', active: false, icon: 'save' },
        { label: 'E', title: 'Exit', active: false, icon: 'exit' }
      ]
    }
  },
  methods: {
    handleBtnClick(btnIndex) {
      switch (btnIndex) {
        case 0:
          this.$emit('propertyBtnClick')
          break
        case 1:
          this.$emit('saveBtnClick')
          break
        case 2:
          this.$emit('exitBtnClick')
          break
      }
    }
  }
}
</script>
<style scoped>
  .ux-draw-toolbar-container {
    width: 26px;
    height: 78px;
    position: absolute;
    right: 0;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    border-radius: 4px;
  }

  .ux-draw-toolbar-container .item-icon {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: contain;
    background: no-repeat center center;
  }
  .ux-draw-button-container {
    position: relative;
  }

  .ux-draw-button-container .control-button {
    padding: 5px;
    box-sizing: border-box;
    position: relative;
    z-index: 3;
  }

  .ux-draw-button-container a, .ux-draw-button-container a:hover {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    width: 26px;
    height: 26px;
    line-height: 26px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: black;
  }
  .ux-draw-button-container:first-child a {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .ux-draw-button-container:last-child a {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .ux-draw-button-container .control-button:hover {
    cursor: pointer;
    background-color: #f4f4f4;
  }
  .active .control-button{
    box-shadow: inset 0 -1px 5px 2px rgba(81, 77, 77, 0.31);
  }
  .ux-draw-toolbar-container .info {
    background-image: url("./icons/info.svg");
  }
  .ux-draw-toolbar-container .save {
    background-image: url("./icons/save.svg");
  }
  .ux-draw-toolbar-container .exit {
    background-image: url("./icons/exit.svg");
  }
</style>
