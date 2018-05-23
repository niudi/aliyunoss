import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import mainPage from '@/components/mainPage'
import firstClerk from '@/components/first_clerk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: "/mainPage",
      name: "mainPage",
      component: mainPage,

    },
    {
      path: "/firstClerk",
      name: "firstClerk",
      component: firstClerk,

    }
  ]
})
