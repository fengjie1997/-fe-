/** System 模块 **/
import Layout from '@/views/common/layout/Layout'

// import Vue from 'vue';
// import {Icon} from 'element-ui';

const router = {
  path: '/data',
  component: Layout,
  name: 'data',
  redirect: 'noredirect',
  alwaysShow: true,
  meta: { title: 'data', icon: 'tab', perm: '/data' },
  children: [
    {
      path: 'sourcefile',
      component: resolve => (require(['@/views/data/sourcefile/list.vue'], resolve)),
      name: 'sourcefile',
      meta: { title: 'sourcefileMgr', perm: '/sourcefile' }

    },
    // {
    //   path: 'baseData',
    //   component: resolve => (require(['@/views/data/baseData/index.vue'], resolve)),
    //   name: 'baseData',
    //   meta: {
    //     title: 'baseData',
    //     perm: '/baseData'
    //   }
    // },
    // {
    //   path: 'baseStation',
    //   component: resolve => (require(['@/views/data/station/index.vue'], resolve)),
    //   name: 'baseStation',
    //   meta: {
    //     title: 'baseStation',
    //     perm: '/baseStation'
    //   }
    // },
    {
      path: 'baseStation',
      component: resolve => (require(['@/views/data/baseStation/index.vue'], resolve)),
      name: 'baseStation',
      meta: {
        title: 'baseStation',
        perm: '/baseStation'
      }
    },
    {
      path: 'dataRegion',
      component: resolve => (require(['@/views/data/dataRegion/index.vue'], resolve)),
      name: 'dataRegion',
      meta: {
        title: 'dataRegion',
        perm: '/dataRegion'
      }
    },
    {
      path: 'dataTraffic',
      component: resolve => (require(['@/views/data/dataTraffic/index.vue'], resolve)),
      name: 'dataTraffic',
      meta: {
        title: 'dataTraffic',
        perm: '/dataTraffic'
      }
    },
    {
      path: 'fileCheck',
      component: resolve => (require(['@/views/data/fileCheck/index.vue'], resolve)),
      name: 'fileCheck',
      meta: {
        title: 'fileCheck',
        perm: '/fileCheck'
      }
    }
  ]
}
export default router
