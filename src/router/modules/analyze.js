/** monitored 模块 **/
import Layout from '@/views/common/layout/Layout'
//
// const dataAnalyzeRouter = {
//   path: '/dataAnalyze',
//   component: Layout,
//   redirect: 'noredirect',
//   children: [{
//     path: 'index',
//     component: resolve => (require(['@/views/analyze/index.vue'),
//     name: 'dataAnalyze',
//     meta: {
//       title: 'dataAnalyze',
//       icon: 'example'
//     }
//   }]
// }
// const dataAnalyzeRouter = {
//   path: '/dataAnalyze',
//   component: Layout,
//   name: 'dataa',
//   redirect: 'noredirect',
//   alwaysShow: true,
//   meta: {
//     title: 'dataAnalyze',
//     icon: 'people',
//     perm: '/dataAnalyze'
//   },
//   children: [{
//     path: 'index',
//     component: resolve => (require(['@/views/analyze/index.vue'),
//     name: 'dataAnalyze',
//     meta: {
//       title: 'dataAnalyze'
//     }
//   }, {
//     path: 'map',
//     component: resolve => (require(['@/views/analyze/map.vue'),
//     name: 'Map',
//     meta: {
//       title: 'map',
//       perm: '/map'
//     }
//   }]
// }
const dataAnalyzeRouter = {
  path: '/dataAnalyze',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'index',
    component: resolve => (require(['@/views/analyze/index.vue'], resolve)),
    name: 'analyze',
    meta: {
      title: 'dataAnalyze',
      icon: 'excel',
      perm: '/dataAnalyze'
    }
  }]
}

export default dataAnalyzeRouter
