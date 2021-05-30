/** monitored 模块 **/
import Layout from '@/views/common/layout/Layout'

const deviceMonitoredRouter = {
  path: '/monitored',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'index',
    component: resolve => (require(['@/views/monitored/index.vue'], resolve)),
    name: 'monitored',
    meta: {
      title: 'deviceMonitored',
      icon: 'example',
      perm: '/monitored'
    }
  }]
}
export default deviceMonitoredRouter
