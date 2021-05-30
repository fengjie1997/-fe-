/** 报表 模块 **/
import Layout from '@/views/common/layout/Layout'

// import Vue from 'vue';
// import {Icon} from 'element-ui';

const reportRouter = {
  path: '/report',
  component: Layout,
  name: 'report',
  redirect: 'noredirect',
  children: [{
    path: 'report',
    component: resolve => (require(['@/views/reports/index.vue'], resolve)),
    name: 'report_c1',
    meta: {
      title: 'report',
      icon: 'chart',
      perm: '/report'
    }
  }]
}
export default reportRouter
