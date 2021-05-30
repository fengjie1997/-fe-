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
        <el-table-column prop="rate" label="扫描速率(Hz/S)" width="120" align="center" />
        <el-table-column prop="rbw" label="分辨带宽(KHz)" width="120" align="center" />
        <el-table-column prop="startFrequency" label="起始频率(Mhz)" width="120" align="center" />
        <el-table-column prop="stopFrequency" label="终止频率(MHz)" width="120" align="center" />
        <el-table-column prop="spacing" label="步进(Hz)" width="100" align="center" />
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
            <el-form-item label="起始频率(MHz)">
              <el-input-number v-model="channelInfo.startFrequency" :min="350" :max="4400" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终止频率(MHz)">
              <el-input-number v-model="channelInfo.stopFrequency" :min="350" :max="4400" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扫描速率(Hz/s)">
              <el-input-number v-model="channelInfo.rate" :min="0" :max="200" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="步进(Hz)">
              <el-input-number v-model="channelInfo.spacing" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分辨带宽(KHz)">
              <el-select v-model="channelInfo.rbw" placeholder="请选择分辨带宽">
                <el-option
                  v-for="item in rbwOptions"
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
      section1: '',
      section2: '',
      section3: '',
      section4: '',
      section: [0, 0],
      checkedChannelList: [],
      dialogVisible: false,
      channelInfo: {
        rate: 10,
        rbw: 100,
        startFrequency: 2110,
        stopFrequency: 2170,
        spacing: 1024
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
      rbwOptions: getDictByTagName('RBW')
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
