import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user'  // 重定向
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'],resolve),
      children:[
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['../components/page/User.vue'],resolve)
        },
        {
          path: '/oder',
          name: 'oder',
          component: resolve => require(['../components/page/Oder.vue'],resolve)
        },
        {
          path: '/shoppingcart',
          name: 'shoppingcart',
          component: resolve => require(['../components/page/Shoppingcart.vue'], resolve)
        },
        {
          path: '/goods',
          name: 'goods',
          component: resolve => require(['../components/page/Goods.vue'], resolve)
        },
        {
          path: '/investor',
          name: 'investor',
          component: resolve => require(['../components/page/Investor.vue'], resolve)
        },
        {
          path: '/apply',
          name: 'apply',
          component: resolve => require(['../components/page/Apply.vue'], resolve)
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
