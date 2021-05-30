import Vue from 'vue'
import UrlList from './urlList.vue'
const urlListRule = {
  type: 'template',
  name: 'childrenField',
  formType: 'list',
  title: 'servers',
  field: 'serverList',
  col: { span: 24, xs: 24 },
  template: '<UrlList :list="list" @update="update" />',
  vm: new Vue(
    {
      components: { UrlList },
      data: {
        list: {
          servers: []
        }

      },
      methods: {
        update(data) {
          this.list.servers = data
        }
      }
    })
}
export { urlListRule }
