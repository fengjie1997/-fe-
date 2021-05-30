<template>
  <div id="contextmenu" class="contextmenu">
    <div class="contextmenu__item" @click="handleMoveUp()">Move Up</div>
    <div class="contextmenu__item" @click="handleMoveDown()">Move Down</div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    model: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      row: '',
      tmep: []
    }
  },
  created() {
    console.log(this.model)
  },
  methods: {
    init(row, column, event) {
      this.row = row
      console.log(row)
      if (this.row.hasOwnProperty('taskSequence')) {
        this.model.forEach(item => {
          item.children.forEach(task => {
            if (task.id === row.id) {
              this.temp = item.children
            }
          })
        })
      } else {
        this.temp = this.model
      }
      const menu = document.querySelector('#contextmenu')
      // 防止菜单太靠底，根据可视高度调整菜单出现位置
      menu.style.top = event.clientY - 156 + 'px'
      menu.style.left = event.clientX - 240 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    },
    foo() {
      this.$emit('foo', this.row)
    },
    handleMoveUp() {
      if (this.row.hasOwnProperty('groupSequence')) {
        if (((this.row.groupSequence - 1) < this.model.length) && ((this.row.groupSequence - 1) > 0)) {
          this.$emit('handleMoveUp', this.row, this.temp)
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('common.actionFailed'),
            type: 'error',
            duration: 2000 })
        }
      } else {
        let length = ''
        this.model.forEach(group => {
          if (group.children.length > 0) {
            group.children.forEach(task => {
              if (task.id === this.row.id) {
                length = group.children.length
              }
            })
          }
        })
        if (((this.row.taskSequence - 1) < length) && ((this.row.taskSequence - 1) > 0)) {
          this.$emit('handleMoveUp', this.row, this.temp)
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('common.actionFailed'),
            type: 'error',
            duration: 2000 })
        }
      }
    },
    handleMoveDown() {
      if (this.row.hasOwnProperty('groupSequence')) {
        if (this.row.groupSequence  < this.model.length) {
          this.$emit('handleMoveDown', this.row, this.temp)
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('common.actionFailed'),
            type: 'error',
            duration: 2000 })
        }
      } else {
        let length = ''
        this.model.forEach(group => {
          if (group.children.length > 0) {
            group.children.forEach(task => {
              if (task.id === this.row.id) {
                length = group.children.length
              }
            })
          }
        })
        console.log(this.row.taskSequence, length)
        if (this.row.taskSequence < length) {
          this.$emit('handleMoveDown', this.row, this.temp)
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('common.actionFailed'),
            type: 'error',
            duration: 2000 })
        }
      }
    }
  }
}
</script>

<style scoped>
  .contextmenu__item {
    display: block;
    line-height: 34px;
    text-align: center;
  }
  .contextmenu__item:not(:last-child) {
    border-bottom: 1px solid rgba(64,158,255,.2);
  }
  .contextmenu {
    position: absolute;
    background-color: #ecf5ff;
    width: 100px;
    /*height: 106px;*/
    font-size: 12px;
    color: #66b1ff;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    z-index: 1000;
  }
  .contextmenu__item:hover {
    cursor: pointer;
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }
</style>
