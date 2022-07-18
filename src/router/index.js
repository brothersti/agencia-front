import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/PageNotFound.vue'

import AddBus from '../views/bus/AddBus.vue'; 
import BusManager from '../views/bus/BusManager.vue'; 
import EditBus from '../views/bus/EditBus.vue'; 

import AddChofer from '../views/chofer/AddChofer.vue'; 
import EditChofer from '../views/chofer/EditChofer.vue'; 
import ChoferManager from '../views/chofer/ChoferManager.vue'; 


const routes = [
  {
    path: '/',
    name: 'home',
    component:HomeView
  },
  {
    path: '/bus',
    name: 'busManager',
    component: BusManager
  },
  {
    path: '/bus/add',
    name: 'addBus',
    component: AddBus
  },
  {
    path: '/bus/edit/:busId',
    name: 'editBus',
    component: EditBus
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound
  },
  {
    path: '/chofer',
    name: 'choferManager',
    component: ChoferManager
  },
  {
    path: '/chofer/add',
    name: 'addchofer',
    component: AddChofer
  },
  {
    path: '/chofer/edit/:choferId',
    name: 'editChofer',
    component: EditChofer
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass:'active'
})

export default router
