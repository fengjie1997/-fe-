<template>
  <el-row>
    <el-col :span="24">
      <el-table
        ref="timeTable"
        :data="list"
        style="width: 80%"
        border
      >
        <el-table-column align="center" type="index" width="50" label="序号" fixed="left" />
        <el-table-column prop="networkType" label="网络类型" width="160" align="center" />
        <el-table-column prop="bandMask" label="分辨带宽(KHz)" width="160" align="center" />
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" :name="scope.row" circle @click="dialogVisible = true" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDel(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog
      title="添加频段"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="listForm" :model="channelInfo" label-position="right" label-width="155px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="网络类型">
              <el-select v-model="channelInfo.networkType" placeholder="请选择网络类型">
                <el-option
                  v-for="item in rbwOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="频段掩码">
              <el-select v-model="channelInfo.bandMask" placeholder="请选择频段掩码">
                <el-option
                  v-for="item in bandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="md" type="primary" @click="handleAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { getDictByTagName } from '@/utils/dictCache.js'
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedChannelList: [],
      dialogVisible: false,
      channelInfo: {
        networkType: getDictByTagName('TNetworkType')[0],
        bandMask: getDictByTagName('LTEBand')[0]
      },
      channelList: [],
      key: false,
      value: '',
      channelListOptions: [
        {
          label: '1',
          value: 1
        }
      ],
      bandOptions: getDictByTagName('LTEBand'),
      rbwOptions: getDictByTagName('cwNetworkType')
    }
  },
  created() {
    // console.log(getDictByTagName('channelList'))
  },
  methods: {
    handleAdd() {
      this.list.push(this.channelInfo)
      this.$emit('setList', JSON.parse(JSON.stringify(this.list)))
      this.dialogVisible = false
      this.$nextTick(() => {
        this.$refs.listForm.resetFields()
      })
    },
    handleDel(index) {
      this.list.splice(index, 1)
      this.$emit('setList', JSON.parse(JSON.stringify(this.list)))
    }

  }
}

</script>
