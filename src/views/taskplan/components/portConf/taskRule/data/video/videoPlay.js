import Vue from 'vue'
import VideoPlay from './videoPlay.vue'
import { commonOptions } from '../../common/common'

var taskVideoPlay =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'videoPlayTestConfig',
    col: { span: 24, xs: 24 },
    template: '<VideoPlay ref="refVideoPlay" :data="data"  @updateForm="update"  />',
    vm: new Vue({
      components: { VideoPlay },
      data: {
        data: {},
        title: '',
        active: ['1'],
        modelForm: {},
        option: commonOptions,
        formData: {}
      },
      watch: {
        data(newData) {
          newData.noDataTimeout = newData.noDataTimeout / 1000
          this.rule.forEach(item => {
            if (item.reverseParse) {
              newData[item.field] = item.reverseParse(newData[item.field])
            }
          })
        }
      },
      methods: {
        update(data) {
          this.formData = data
        }
      }
    })
  }

export { taskVideoPlay }
