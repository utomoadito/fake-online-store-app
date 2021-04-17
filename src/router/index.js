import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
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
                component: Dashboard
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router