import Vue from 'vue'
import UrlList from './urlList.vue'
const urlListRule = {
  type: 'template',
  name: 'childrenField',
  formType: 'list',
  title: 'URL',
  field: 'urlList',
  col: { span: 24, xs: 24 },
  template: '<UrlList :list="list" @update="update" />',
  vm: new Vue({
    components: { UrlList },
    data: {
      list: {
        urlInfos: []
      }
    },
    methods: {
      update(data) {
        this.list.urlInfos = data
      }
    }
  })
}
export { urlListRule }
