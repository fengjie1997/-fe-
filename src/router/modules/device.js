/** Device 模块 **/
import Layout from '@/views/common/layout/Layout'

const deviceTableRouter = {
  path: '',
  component: Layout,
  name: 'device',
  redirect: 'noredirect',
  meta: {
    title: 'deviceMgr',
    icon: 'device',
    perm: '/device'
  },
  children: [{
    path: '',
    component: resolve => (require(['@/views/device/index.vue'], resolve)),
    name: 'deviceList',
    meta: {
      title: 'deviceList',
      perm: '/device/deviceList',
      noCache: true,
      affix: true
    }
  },
  {
    path: 'device/statistics',
    component: resolve => (require(['@/views/device/statistics/index.vue'], resolve)),
    name: 'statistics',
    meta: {
      title: 'statistics',
      perm: '/device/statistics'
    }
  },
  {
    path: 'device/circular',
    component: resolve => (require(['@/views/device/circular/index.vue'], resolve)),
    name: 'circular',
    meta: {
      title: 'circular',
      perm: '/device/circular'
    }
  },
  {
    path: 'device/upgrade',
    component: resolve => (require(['@/views/device/upgrade/index.vue'], resolve)),
    name: 'upgrade',
    meta: {
      title: 'upgrade',
      perm: '/device/upgrade'
    }
  }
  ]
}
export default deviceTableRouter
