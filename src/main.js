import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'core-js'
import './assets/css/tailwind.css'
import './permission'

const app = createApp(App)
    .use(router)

app.mount('#app')
