import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/PageNotFound.vue'

import AddBus from '../views/bus/AddBus.vue'; 
import BusManager from '../views/bus/BusManager.vue'; 
import EditBus from '../views/bus/EditBus.vue'; 

import AddChofer from '../views/chofer/AddChofer.vue'; 
import EditChofer from '../views/chofer/EditChofer.vue'; 
import ChoferManager from '../views/chofer/ChoferManager.vue'; 

import AddTrayecto from '../views/trayecto/AddTrayecto.vue'; 
import EditTrayecto from '../views/trayecto/EditTrayecto.vue'; 
import TrayectoManager from '../views/trayecto/TrayectoManager.vue'; 

import AddPasajero from '../views/pasajero/AddPasajero.vue'; 
import EditPasajero from '../views/pasajero/EditPasajero.vue'; 
import PasajeroManager from '../views/pasajero/PasajeroManager.vue'; 


const routes = [
  {
    path: '/',
    name: 'home',
    component:HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound
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
  {
    path: '/trayecto',
    name: 'trayectoManager',
    component: TrayectoManager
  },
  {
    path: '/trayecto/add',
    name: 'addTrayecto',
    component: AddTrayecto
  },
  {
    path: '/trayecto/edit/:trayectoId',
    name: 'editTrayecto',
    component: EditTrayecto
  },
  {
    path: '/pasajero',
    name: 'pasajeroManager',
    component: PasajeroManager
  },
  {
    path: '/pasajero/add',
    name: 'addPasajero',
    component: AddPasajero
  },
  {
    path: '/pasajero/edit/:pasajeroId',
    name: 'editPasajero',
    component: EditPasajero
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass:'active'
})

export default router
