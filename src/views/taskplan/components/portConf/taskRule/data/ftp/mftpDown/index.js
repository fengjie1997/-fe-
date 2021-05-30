/**
 * multi ftp download
 * @param MFTPDownList
 * @return {}
 */
import Vue from 'vue'
import NodeForm from './nodeForm.vue'
import { rules } from './rules'
import { commonOptions } from '../../../common/common'

var taskMultiFtpDownload =
  {
    type: 'template',
    hasChildren: true,
    field: 'mftpDownloadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<NodeForm ref="nodeForm" :rule="rule" @update="updateForm" />',
    vm: new Vue({
      components: { NodeForm },
      data: {
        data: {},
        formData: {},
        modelForm: {},
        rule: rules,
        option: commonOptions
      },
      computed: {
        formDatas() {
          return this.getFormData()
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          // 采样间隔的处理
          if (newData.mftpDownList.mftpDownConfigs) {
            newData.mftpDownList.mftpDownConfigs.forEach(item => {
              item.samplesInterval = item.samplesInterval / 1000
            })
          }
          // 为表单中formcreate字段初始化
          this.$refs.nodeForm.modelForm.rule.forEach(item => {
            if (item.parse) {
              this.$refs.nodeForm.modelForm.setValue(item.field, newData[item.field] / 1000)
            }
          })
          this.$refs.nodeForm.setForm(newData)
        }
      },
      methods: {
        updateForm(data) {
          console.log('lastdata', data)
          this.formData = data
        }
      }
    })
  }

export { taskMultiFtpDownload }
