/* eslint-disable object-property-newline */
import Vue from 'vue'
import Router from 'vue-router'
import Editbl from '@/components/editbl'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Index, Editbl
    }
  ]
})
