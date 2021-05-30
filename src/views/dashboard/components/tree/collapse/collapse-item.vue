<template>
  <div
    class="el-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`el-collapse-content-${id}`"
      :aria-describedby="`el-collapse-content-${id}`"
    >
      <div
        :id="`el-collapse-head-${id}`"
        class="el-collapse-item__header"
        role="button"
        :tabindex="disabled ? undefined : 0"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        style="border:0;height:30"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <i
          class="el-collapse-item__arrow el-icon-caret-right"
          :class="{'is-active': isActive}"
          style="margin-left:5px;color:#555555"
        />
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <el-collapse-transition>
      <div
        v-show="isActive"
        :id="`el-collapse-content-${id}`"
        class="el-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`el-collapse-head-${id}`"
      >
        <div class="el-collapse-item__content">
          <slot />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition'
import Emitter from 'element-ui/src/mixins/emitter'
import { generateId } from 'element-ui/src/utils/util'

export default {
  name: 'ElCollapseItem',

  componentName: 'ElCollapseItem',

  components: { ElCollapseTransition },

  mixins: [Emitter],

  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    name: {
      type: [String, Number],
      default() {
        return this._uid
      }
    },
    disabled: Boolean
  },

  data() {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    }
  },

  inject: ['collapse'],

  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1
    }
  },

  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true
        } else {
          this.isClick = false
        }
      }, 50)
    },
    handleHeaderClick() {
      if (this.disabled) return
      this.dispatch('ElCollapse', 'item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick() {
      this.dispatch('ElCollapse', 'item-click', this)
    }
  }
}
</script>
