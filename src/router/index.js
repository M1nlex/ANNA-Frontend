import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: {name: 'dashboard'}
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/pages/LoginPage.vue'], resolve)
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: resolve => require(['@/pages/DashboardPage.vue'], resolve)
        },
        {
            path: '/user/:id',
            name: 'user',
            component: resolve => require(['@/pages/UserPage.vue'], resolve)
        },
        {
            path: '/blog',
            name: 'blog',
            component: resolve => require(['@/pages/BlogPage.vue'], resolve)
        },
        {
            path: '/storage',
            name: 'storage',
            component: resolve => require(['@/pages/StoragePage.vue'], resolve)
        },
        {
            path: '/forum',
            name: 'forum',
            component: resolve => require(['@/pages/ForumPage.vue'], resolve)
        },
        {
            path: '/events',
            name: 'events',
            component: resolve => require(['@/pages/EventsPage.vue'], resolve)
        },
        {
            path: '/gantt',
            name: 'gantt',
            component: resolve => require(['@/pages/GanttPage.vue'], resolve)
        },
        {
            path: '/profile',
            name: 'profile',
            component: resolve => require(['@/pages/ProfilePage.vue'], resolve)
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: resolve => require(['@/pages/PageNotFound.vue'], resolve)
        }
    ]
});