import Vue from 'vue'
import UrlList from './urlList.vue'
const urlListRule = {
  type: 'template',
  name: 'childrenField',
  formType: 'list',
  title: 'URL',
  field: 'pingAddressList',
  col: { span: 24, xs: 24 },
  template: '<UrlList :list="list" @update="update" />',
  vm: new Vue(
    {
      components: { UrlList },
      data: {
        list: {
          pingAddress: []
        }
      },
      methods: {
        update(data) {
          this.list.pingAddress = data
        }
      }
    })
}
export { urlListRule }
