import { createRouter, createWebHistory } from 'vue-router';

// Pages
const UsersPage = () => import('@/pages/users.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'users',
            component: UsersPage,
        },
    ],
});

export default router;
