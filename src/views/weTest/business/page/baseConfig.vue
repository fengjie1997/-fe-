<template>
  <div>
    <!-- PING配置 -->
    <BlockView :name="$t('business.ping')" :model="model.ping" :rows="ping">
      <span class="span_element">
        <el-form-item :prop="'subDicts.'+ itemIndex + '.sort'">
          <el-input v-model="item.sort" :placeholder="$t('dict.sort')" style="width:90px" />
        </el-form-item>
      </span>
      <span class="span_element">
        <!-- 此处的修改和删除是子元素，对数据的操作，而并不提交请求 -->
        <el-button size="mini" type="danger" @click="handleElementDelete(itemIndex)">{{ $t('common.delete') }}</el-button>
        <el-button size="mini" type="primary" @click="handleElementAdd(itemIndex)">{{ $t('common.add') }}</el-button>
      </span>
    </BlockView>
  </div>
</template>

<script>
import { BlockView } from '../components/index'
export default {
  name: 'ConfigView',
  components: {
    BlockView
  },
  data() {
    return {
      model: {
        ping: {
          businessName: '',
          ip: 'www.baidu.com',
          pkgSize: '64',
          pkgPeriod: '1.0',
          SendPkgNum: '5',
          tryNum: '1',
          intervalTime: '10',
          testDuration: '20'
        }
      },
      /**
         * info
      */
      ping: [
        {
          span: 24,
          columns: [{
            label: this.$t('parameter.tryNum'),
            type: 'text',
            model: 'tryNum'
          }]
        },
        {
          span: 24,
          columns: [{
            label: this.$t('parameter.intervalTime'),
            type: 'text',
            model: 'intervalTime'
          }]
        }, {
          span: 24,
          columns: [{
            label: this.$t('parameter.testDuration'),
            type: 'text',
            model: 'parameter.testDuration'
          }, {
            label: this.$t('parameter.intervalTime'),
            type: 'text',
            model: ''
          }]
        }]
    }
  }

}
</script>

<style scoped>
  .span_element {
    float:left;padding-left:10px;
  }
</style>
