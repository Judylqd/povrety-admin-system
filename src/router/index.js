import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/showcase'  // 重定向
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'],resolve),
      children:[
        {
          path: '/showcase',
          name: 'showcase',
          component: resolve => require(['../components/page/Showcase.vue'],resolve)
        },
        {
          path: '/news',
          name: 'news',
          component: resolve => require(['../components/page/News.vue'],resolve)
        },
        {
          path: '/notice',
          name: 'notice',
          component: resolve => require(['../components/page/Notice.vue'],resolve)
        },
        {
          path: '/casemarkdown',
          name: 'casemarkdown',
          component: resolve => require(['../components/page/CaseMarkdown.vue'], resolve)
        },
        {
          path: '/newsnoticemarkdown',
          name: 'newsnoticemarkdown',
          component: resolve => require(['../components/page/NewsNoticeMarkdown.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
