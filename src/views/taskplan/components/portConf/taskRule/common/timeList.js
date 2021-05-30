import Vue from 'vue'
import { commonOptions } from '../common/common'
//
const timeListRule = {
  type: 'template',
  name: 'children',
  title: 'URL',
  field: 'urlList',
  col: { span: 24, xs: 24 },
  template: '<div><el-row><form-create v-model="modelForm" :rule="rule" :option="option" /></el-row><el-row v-for="(item, idx) in list" :key="idx" style="margin-bottom:10px;"><el-col :span="16"><el-input v-model="item.url" placeholder="请输入内容" @change="handleList()" /></el-col><el-col :span="8"><el-button style="margin-left:5px;" type="danger" icon="el-icon-delete" @click="remove(idx)"></el-button> <el-button type="primary" icon="el-icon-plus" @click="add(idx)"> </el-button> </el-col></el-row></div>',
  vm: new Vue({
    data: {
      title: 'URL',
      active: ['1'],
      modelForm: {},
      rule: [
        {
          type: 'hidden',
          field: 'tst',
          value: []
        }
      ],
      option: commonOptions,
      list: [
        {
          isCheck: true,
          url: ''
        }
      ],
      urlList: []
    },
    methods: {
      add(idx) {
        console.log(idx)
        this.list.push({
          isCheck: true,
          url: ''
        })
      },
      remove(idx) {
        if (this.list.length > 1) {
          this.list.splice(idx, 1)
        }
        console.log(idx)
      },
      handleList() {
        this.list.forEach(item => {
          this.urlList.push({
            urlInfo: item
          })
        })
      }

    }
  })
}
export { timeListRule }
