import { createRouter, createWebHistory } from 'vue-router'

import UsersCreateView from '../views/UsersCreateView.vue'
import UsersEditView from '../views/UsersEditView.vue'
import UsersListView from '../views/UsersListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users-list',
      component: UsersListView
    },
    {
      path: '/users/create',
      name: 'users-create',
      component: UsersCreateView
    },
    {
      path: '/users/:id/edit',
      name: 'users-edit',
      component: UsersEditView,
      props: true
    }
  ]
})

export default router
