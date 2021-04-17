import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import 'core-js'
import './assets/css/tailwind.css'
import './permission'

const app = createApp(App)
    .use(store)
    .use(router)

app.mount('#app')
