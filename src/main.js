// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  

Vue.config.productionTip = false;
Vue.use(ElementUI,{size: 'small'});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username');
  const time = localStorage.getItem('timeout');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (time && time < new Date().getTime()) {  // 先判断time是否存在，退出登录就不存在了，登录状态过期检测
    next('/login');
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
