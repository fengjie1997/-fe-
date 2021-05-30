<template>
  <div class="rm-property-container">
    <el-form ref="regionEditForm" :rules="rules" :model="regionForm" label-width="80px">
      <el-input :value="regionForm.id" type="hidden" />
      <el-form-item
        :label="$t('baseData.areaName')"
        prop="name"
      >
        <el-input v-model="regionForm.name" class="ux-form-item" :disabled="regionForm.type === 0" />
      </el-form-item>
      <el-form-item
        v-show="regionForm.parentId !== 0"
        :label="$t('baseData.attributionArea')"
        prop="parentId"
      >
        <el-select v-model="regionForm.parentId" :disabled="regionForm.type === 0" :placeholder="$t('common.pleaseSelect')" class="ux-form-item">
          <el-option-group
            v-for="adminRegion in adminRegions"
            :key="adminRegion.id"
            :label="adminRegion.name"
          >
            <el-option
              v-for="item in adminRegion.children"
              :key="item.id + item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="regionForm.type !== 0"
        :label="$t('baseData.areaType')"
        prop="type"
      >
        <el-select v-model="regionForm.type" :placeholder="$t('common.pleaseSelect')" class="ux-form-item">
          <el-option
            v-for="item in regionTypes"
            :key="item.code"
            :label="item.name"
            :value="parseInt(item.code)"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('baseData.lineWidth')">
        <el-input-number v-model="regionForm.lineWidth" :min="0" class="ux-form-item" @change="handleStyleChange" />
      </el-form-item>
      <el-form-item :label="$t('baseData.lineColor')">
        <el-color-picker v-model="regionForm.lineColor" @change="handleStyleChange" />
      </el-form-item>
      <el-form-item :label="$t('baseData.fillColor')">
        <el-color-picker v-model="regionForm.fillColor" @change="handleStyleChange" />
      </el-form-item>
      <el-form-item :label="$t('baseData.opacity')">
        <el-slider v-model="regionForm.opacity" :min="0" :max="1" :step="0.1" class="ux-form-item" @change="handleStyleChange" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCacheDict } from '@/utils/dictCache'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      rules: {
        name: [
          {
            required: true, message: this.$t('baseData.areaMessage'), trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              // 内容不能为空（内容只包含空格时为空）
              if (!/([^\s])/.test(value)) {
                callback(new Error(this.$t('baseData.areaMessage')))
              } else {
                callback()
              }
            }
          }
        ],
        parentId: [
          {
            required: true, message: this.$t('baseData.attributionAreaMessage'), trigger: ['blur', 'change']
          }
        ]
      },
      regionForm: {
        id: undefined,
        name: '',
        parentId: null,
        type: 1,
        lineWidth: 2,
        lineColor: '#1890ff',
        fillColor: '#1890ff',
        opacity: 0.3
      },
      regionTypes: getCacheDict('importRegionType')
    }
  },
  computed: {
    ...mapState({
      adminRegions: state => state.dataManagement.adminRegions
    })
  },
  created() {
    this.isVisible = false
    this.getAdminRegions()
  },
  methods: {
    ...mapActions({
      getAdminRegions: 'dataManagement/getAdminRegions'
    }),
    handleStyleChange() {
      this.$emit('regionStyleChange', {
        lineWidth: this.regionForm.lineWidth,
        lineColor: this.regionForm.lineColor,
        fillColor: this.regionForm.fillColor,
        opacity: this.regionForm.opacity
      })
    },
    resetForm() {
      this.regionForm = {
        id: undefined,
        name: '',
        parentId: null,
        type: 1,
        lineWidth: 2,
        lineColor: '#1890ff',
        fillColor: '#1890ff',
        opacity: 0.3
      }
    }
  }
}
</script>
<style scoped>
  .rm-property-container {
    background: #ffffff;
    width: 356px;
    padding: 18px 18px 0 18px;
  }
  .rm-property-container >>> .el-form {
    display: flex;
    flex-direction: column;
  }
  .rm-property-container .ux-form-item {
    width: 240px;
  }
</style>
