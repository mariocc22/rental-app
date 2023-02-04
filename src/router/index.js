import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfile from '../views/UserProfile.vue'
import CreatePlace from '../views/CreatePlace.vue'
import ViewPlace from '../views/ViewPlace.vue'
import MyPlaces from '../views/MyPlaces.vue'
import ListPlaces from '../views/ListPlaces.vue'
import MyBookings from '../views/MyBookings.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile
  },
  {
    path: '/create-place',
    name: 'create-place',
    component: CreatePlace
  },
  {
    path: '/view-place',
    name: 'view-place',
    component: ViewPlace
  },
  {
    path: '/my-places',
    name: 'my-places',
    component: MyPlaces
  },
  {
    path: '/list-places',
    name: 'list-places',
    component: ListPlaces
  },
  {
    path: '/my-bookings',
    name: 'my-bookings',
    component: MyBookings
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
