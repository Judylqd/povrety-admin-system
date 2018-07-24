import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/showcase'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'],resolve),
      children:[
        {
          path: '/showcase',
          component: resolve => require(['../components/page/Showcase.vue'],resolve)
        },
        {
          path: '/news',
          component: resolve => require(['../components/page/News.vue'],resolve)
        },
        {
          path: '/notice',
          component: resolve => require(['../components/page/Notice.vue'],resolve)
        },
        {
          path: '/casemarkdown',
          component: resolve => require(['../components/page/CaseMarkdown.vue'], resolve)
        },
        {
          path: '/newsmarkdown',
          component: resolve => require(['../components/page/NewsMarkdown.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
