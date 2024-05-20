import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/components/pages/AuthPage.vue';
import KeysPage from '@/components/pages/KeysPage.vue';
import CodePage from '@/components/pages/CodePage.vue';

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: AuthPage,
  },
  {
    path: '/code/:user',
    name: 'Code',
    component: CodePage,
  },
  {
    path: '/keys/:user',
    name: 'UserKeys',
    component: KeysPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;