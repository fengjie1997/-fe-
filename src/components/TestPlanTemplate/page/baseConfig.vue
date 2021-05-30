<template>
  <div>
    <BlockView :name="$t('template.baseInfo')" :model="model.info" :rows="info" />

    <!-- 执行周期 -->

    <!-- 数据传输设置 -->
    <BlockView :name="$t('template.dataTransSetting')" :model="model.dataTrans" :rows="dataTrans" />
    <!-- MODEM端口SIM卡信息设置 -->
    <BlockView :name="$t('template.modemPortSimCardInfoSetting')" :model="model.modemInfo" :rows="modemPortSimCardInfoSetting" />
    <!-- 高级设置 -->
    <!-- <BlockView :name="$t('template.advancedSetting')" />-->
  </div>
</template>

<script>
import { getCacheDict } from '@/utils/dictCache.js'
import { BlockView } from '../components/index'

export default {
  name: 'BaseConfig',
  components: {
    BlockView
  },
  data() {
    return {
      model: {
        info: {
          beginTime: '',
          endTime: '',
          planName: '',
          repeatType: '0',
          testType: '0',
          testCategory: '0',
          testScenario: '0'
        },
        dataTrans: {
          dataTransOption: '0',
          portNumber: '0'
        },
        modemInfo: {
          phoneNumber: '',
          smscNumber: ''
        }
      },
      /**
         * info
      */
      info: [
        {
          span: 12,
          columns: [{
            label: this.$t('template.beginTime'),
            type: 'beginTime',
            model: 'beginTime'
          }, {
            label: this.$t('template.endTime'),
            type: 'endTime',
            model: 'endTime'
          }
          ]
        },
        {
          span: 8,
          columns: [{
            label: this.$t('template.planName'),
            type: 'text',
            model: 'planName' // 需要更改
          }, {
            label: this.$t('template.repeatType'),
            type: 'dict',
            dict: getCacheDict('repeatType'),
            model: 'repeatType'
          }, {
            label: this.$t('template.testType'),
            type: 'dict',
            dict: getCacheDict('repeatType'),
            model: 'testType'
          }]
        }, {
          span: 8,
          columns: [{
            label: this.$t('template.testCategory'),
            type: 'dict',
            dict: getCacheDict('repeatType'),
            model: 'testCategory'
          }, {
            label: this.$t('template.testScenario'),
            type: 'dict',
            dict: getCacheDict('repeatType'),
            model: 'testScenario'
          }]
        }],
      /**
         * data trans
      */
      dataTrans: [{
        span: 8,
        columns: [{
          label: this.$t('template.dataTransOption'),
          type: 'dict',
          dict: getCacheDict('repeatType'),
          model: 'dataTransOption'
        }, {
          label: this.$t('template.portNumber'),
          type: 'dict',
          dict: getCacheDict('repeatType'),
          model: 'portNumber'
        }]
      }],
      /**
       * MODEM端口SIM卡信息设置
       */
      modemPortSimCardInfoSetting: [{
        span: 8,
        columns: [{
          label: this.$t('template.phoneNumber'),
          type: 'text',
          model: 'phoneNumber'
        }, {
          label: this.$t('template.smscNumber'),
          type: 'text',
          model: 'smscNumber'
        }]
      }]
    }
  }

}
</script>

<style scoped>

</style>
