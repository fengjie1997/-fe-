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
        <el-table-column prop="band" label="频段" width="120" align="center" />
        <el-table-column prop="channel" label="频点" width="200" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="rbw" label="分辨带宽" width="120" align="center" />
        <el-table-column prop="uplink" label="上行标识" width="100" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.uplink" disabled size="mini" />
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" :name="scope.row" circle @click="dialogVisible = true" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDel(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog
      title="添加频段"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form ref="listForm" :model="channelInfo" label-position="right" label-width="155px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="频段">
              <el-select v-model="channelInfo.band" placeholder="请选择频段" @change="handleChannelList">
                <el-option
                  v-for="item in bandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分辨带宽">
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
          <el-col :span="6">
            <el-form-item label="上行标识">
              <el-switch v-model="channelInfo.uplink" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Evdo频率">
              <el-switch v-model="channelInfo.isEvdo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'频点区间['+section[0]+','+section[1]+']'">
              <el-input-number v-model="section1" :min="section[0]" :max="section[1] - 1" /> -
              <el-input-number v-model="section2" :min="section[0] + 1" :max="section[1]" />
              <el-button type="primary" @click="handleSectionAdd(section1,section2)">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col v-show="section.length > 2" :span="12">
            <el-form-item :label="'频点区间['+section[2]+','+section[3]+']'">
              <el-input-number v-model="section3" :min="section[2]" :max="section[3] - 1" /> -
              <el-input-number v-model="section4" :min="section[2] + 1" :max="section[3]" />
              <el-button type="primary" @click="handleSectionAdd(section3,section4)">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选列表">
              <el-input-number v-model="value" />
              <el-button type="primary" @click="handleSingleAdd()">添加</el-button>
              <el-button type="danger" @click="clearAll()">清空全部</el-button>
              <el-checkbox-group
                v-model="checkedChannelList"
                style="padding-top:10px"
                :min="1"
              >
                <el-checkbox v-for="item in channelList" :key="item" :label="item" checked>{{ item }}</el-checkbox>
              </el-checkbox-group>
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
        band: '',
        channel: '',
        uplink: false,
        rbw: '',
        isEvdo: false
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
      if (this.checkedChannelList.length <= 0) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('请填写频点信息'),
          type: 'error',
          duration: 2000
        })
        return false
      } else {
        this.channelInfo.channel = this.checkedChannelList.join(',')
        var newList = Object.assign([], this.list)
        newList.push(Object.assign({}, this.channelInfo))
        this.$emit('setList', newList)
        this.dialogVisible = false
        this.clearAll()
        this.$nextTick(() => {
          this.$refs.listForm.resetFields()
        })
      }
    },
    clearAll() {
      this.channelList = []
      this.checkedChannelList = []
    },
    handleDel() {},

    handleSingleAdd() {
      if (this.section[0] <= this.value && this.value <= this.section[1]) {
        var arr = Object.assign([], this.channelList)
        arr.push(this.value)
        this.channelList = Array.from(new Set(arr))
      }
      if (this.section.length > 2) {
        if (this.section[2] <= this.value && this.value <= this.section[3]) {
          var arr2 = Object.assign([], this.channelList)
          arr2.push(this.value)
          this.channelList = Array.from(new Set(arr2))
        }
      }
    },
    handleSectionAdd(s1, s2) {
      this.createChannelList(s1, s2)
      this.channelList = Array.from(new Set(this.channelList.concat(this.createChannelList(s1, s2))))
    },
    /**
     * @param min
     * @param max
     * @return Array
     */
    createChannelList(min, max) {
      var arr = []
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    handleChannelList(val) {
      this.clearAll()
      switch (val) {
        case 'B1':
          this.section = [0, 599, 18000, 18599]
          break
        case 'B2':
          this.section = [0, 599, 18000, 18599]
          break
        case 'B3':
          this.section = [0, 599, 18000, 18599]
          break
        default:
          break
      }
      console.log(val)
    }

  }
}

</script>
