/** Admin 模块 **/
import Layout from '@/views/common/layout/Layout'

const adminTableRouter = {
  path: '/admin',
  component: Layout,
  name: 'admin',
  redirect: 'noredirect',
  alwaysShow: true,
  meta: {
    title: 'admin',
    icon: 'admin',
    perm: '/admin'
  },
  children: [
    {
      path: 'perm',
      component: resolve => (require(['@/views/admin/perm/perm.vue'], resolve)),
      name: 'perm',
      meta: {
        title: 'permMgr',
        perm: '/perm'
      }
    },
    {
      path: 'dict',
      component: resolve => (require(['@/views/admin/dict/dict.vue'], resolve)),
      name: 'dict',
      meta: {
        title: 'dictMgr',
        perm: '/dict'
      }
    },
    {
      path: 'icon',
      component: resolve => (require(['@/views/icons/index'], resolve)),
      name: 'Icons',
      meta: {
        title: 'icons',
        noCache: true,
        perm: '/icon'
      }
    }
  ]
}
export default adminTableRouter
