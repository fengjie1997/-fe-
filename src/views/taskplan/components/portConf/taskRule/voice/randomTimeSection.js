import Vue from 'vue'
import RandomTimeSection from './randomTimeSection.vue'
const randomTimeSectionListRule = {
  type: 'template',
  name: 'childrenField',
  formType: 'list',
  title: null,
  field: 'randomTimeSection',
  col: { span: 24, xs: 24 },
  template: '<RandomTimeSection :list="list" @update="update" />',
  vm: new Vue(
    {
      components: { RandomTimeSection },
      data: {
        list: {
          useRandomTimeDial: {
            isAvailable: true,
            maxDuration: 0,
            minDuration: 0,
            randomTimeSection: {
              isAvailable: true,
              sectionInfo: [
                {
                  count: 0,
                  maxDuration: 0,
                  minDuration: 0
                }
              ]
            }
          }
        }
      },
      methods: {
        update(data) {
          this.list.useRandomTimeDial = data
          console.log(data)
          // this.list.pingAddress = data
        }
      }
    })
}
export { randomTimeSectionListRule }
