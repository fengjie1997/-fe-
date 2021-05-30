/** 测试计划模板 模块 **/
import Layout from '@/views/common/layout/Layout'

const templateRouter = {
  path: '/template',
  component: Layout,
  name: 'template',
  redirect: 'noredirect',
  children: [{
    path: 'index/:id',
    component: resolve => (require(['@/views/template/template.vue'], resolve)),
    name: 'tpl',
    hidden: true,
    meta: {
      title: 'template',
      icon: 'documentation',
      perm: '/template'
    }
  }]
}
export default templateRouter
