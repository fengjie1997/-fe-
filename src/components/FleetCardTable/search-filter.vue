<template>
  <div>
    <div class="content" style="float: left">
      <template v-for="(item, index) in fieldList">
        <div
          v-show="(icon === 'close' ? index < count : true)"
          :key="index"
        >
          <div v-show="item.display || item.display === undefined" class="item-style">
            <span class="label-style" :style="{width: width.labelWidth + 'px'}">{{ item.label }}</span>
            <!-- 普通输入框 -->
            <el-input
              v-if="item.type === 'input'"
              v-model.trim="insideData[item.value]"
              :size="size"
              :style="`width: ${item.width ? item.width : width.itemWidth}`"
              :type="item.type"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder : item.label"
              @keyup.enter.native="handleFilter"
              @blur="handleEvent($event, item, item.value)"
            />
            <!-- 日期/时间 -->
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="insideData[item.value]"
              :size="size"
              :style="`width: ${item.width ? item.width : width.itemWidth}`"
              :type="item.dateType"
              :unlink-panels="item.unLinkPanels === true"
              :range-separator="item.separator ? item.separator : '-'"
              :value-format="item.valueFormat"
              :picker-options="item.pickerOptions"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始时间'"
              :end-placeholder="item.endPlaceholder ? item.endPlaceholder: '结束时间'"
              :placeholder="item.placeholder ? item.placeholder : item.label"
              @change="handleEvent($event, item, item.value, 'change')"
            />

            <!-- 选择框 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="insideData[item.value]"
              :size="size"
              :style="`width: ${item.width ? item.width : width.itemWidth}`"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :filterable="item.filterable"
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags"
              :placeholder="item.placeholder ? item.placeholder : item.label"
              @change="handleEvent($event, item, item.value, 'change')"
            >
              <el-option
                v-for="childItem in listTypeInfo[item.list]"
                :key="childItem[item.optionKey ? item.optionKey : 'key']"
                :label="childItem[item.optionLabel ? item.optionLabel : 'label']"
                :value="childItem[item.optionValue ? item.optionValue : 'value']"
                :disabled="childItem.disabled"
              />
            </el-select>
            <!-- 计数器 -->
            <el-input-number
              v-if="item.type === 'inputNumber'"
              v-model="insideData[item.value]"
              :size="size"
              :style="`width: ${item.width ? item.width : width.itemWidth}`"
              :min="item.min"
              :max="item.max"
              @change="handleEvent($event, item, item.value, 'change')"
            />
          </div>
        </div>
      </template>

      <div

        v-if="!btnHidden && fieldList.length !== 0"
        class="btn-style"
      >
        <el-button
          :type="btnStyle[0].type"
          :size="size"
          :plain="btnStyle[0].plain"
          :round="btnStyle[0].round"
          :icon="btnStyle[0].icon"
          :disabled="btnStyle[0].disabled"
          @click="handleFilter"
        >
          {{ btnStyle[0].text }}
        </el-button>
        <el-button
          :type="btnStyle[1].type"
          :size="size"
          :plain="btnStyle[1].plain"
          :round="btnStyle[1].round"
          :disabled="btnStyle[1].disabled"
          :icon="btnStyle[1].icon"
          @click="handleReset"
        >
          {{ btnStyle[1].text }}
        </el-button>

        <el-button
          v-if="!btnHidden && fieldList.length > count"
          type="text"
          style="margin-left: 6px;"
          @click="handleExpend"
        >{{ icon === 'open' ? controlName.hide : controlName.display }}
          <i :class="icon === 'open' ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" />
        </el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'SearchFilter',
  props: {
    /** 字段默认数据 */
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    /** 字段配置项 */
    fieldList: {
      type: Array,
      default: () => [],
      required: true
    },
    /** 相关的列表 */
    listTypeInfo: {
      type: Object,
      default: () => {}
    },
    /** 按钮区域是否隐藏 */
    btnHidden: {
      type: Boolean,
      default: false
    },
    /** 组件尺寸 */
    size: {
      type: String,
      default: 'mini'
    },
    /** 默认搜索数 */
    count: {
      type: Number,
      default: 3
    },
    /** 组件及label宽度 */
    width: {
      type: Object,
      default: () => ({
        labelWidth: 'auto',
        itemWidth: '150px'
      })
    },
    /** 按钮配置 */
    btnStyle: {
      type: Array,
      default: () => [
        { icon: null, text: '搜索', disabled: false, type: 'primary', plain: false, round: false },
        { icon: null, text: '重置', disabled: false, type: null, plain: false, round: false }
      ]
    },
    controlName: {
      type: Object,
      default: () => ({
        display: 'Display',
        hide: 'Hide'
      })
    }
  },
  data: () => ({
    insideData: {},
    defaultData: {},
    icon: 'close'
  }),
  mounted() {
    this.insideData = { ...this.data }
  },

  methods: {
    /**
     * 事件
     */
    handleEvent(event, item, val, change) {
      const obj = {
        value: change === 'change' ? event : event.target.value,
        label: val,
        $_item: item,
        $_fieldList: this.fieldList
      }
      this.$emit('handle-event', obj)
    },

    /**
     * 搜索
     */
    handleFilter() {
      this.$emit('handle-filter', this.insideData)
    },

    /**
     * 重置
     */
    handleReset() {
      this.insideData = { ...this.data }
      this.$emit('handle-reset', this.insideData)
    },
    /**
     * 展开事件
     */
    handleExpend() {
      this.icon === 'open' ? this.icon = 'close' : this.icon = 'open'
      this.$emit('handle-expend', {
        event: this.icon,
        $_fieldList: this.fieldList
      })
    }
  }
}
</script>
<style lang="css" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.content .item-style {
  margin: 6px 5px;
  line-height: 1;
}
.content .item-style .label-style {
  display: inline-block;
  justify-self: end;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  text-align: right;
  margin-right: 12px;
  font-weight: normal;
  color: #222222;
}
.btn-style {
  float:right;
  margin: 6px 0 6px auto;
}
  >>>.el-button+.el-button {
    margin-left: 0;
  }
</style>

