import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Layout from '../components/layout/index.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: HelloWorld
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router