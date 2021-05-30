/** Device 模块 **/
import Layout from '@/views/common/layout/Layout'

const testPlanRouter = {
  hidden: true,
  path: '/testPlan',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'list/:deviceName/:deviceId/:deviceType',
    component: resolve => (require(['@/views/taskplan/index.vue'], resolve)),
    name: 'testPlanList',
    meta: {
      title: 'testPlan',
      icon: 'document'
    }
  },
  {
    path: 'conf/:deviceName/:deviceId/:planId',
    component: resolve => (require(['@/views/taskplan/page/addPlan.vue'], resolve)),
    name: 'testPlanConf',
    meta: {
      title: '配置测试计划',
      icon: 'document'
    }
  }
  ]
}
export default testPlanRouter
