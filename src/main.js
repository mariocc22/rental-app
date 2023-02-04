import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { app, analytics } from './modules/firebase.js'
console.log(app)
console.log(analytics)

createApp(App).use(store).use(router).mount('#app')
