import { createWebHistory, createRouter } from "vue-router";
import LoginPage from './components/LoginPage.vue'
import PresensiPage from './components/PresensiPage.vue'
// lazy-loaded
const MainMenu = () => import("./components/MainMenu.vue")
const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: "login", component: LoginPage },
    { path: '/main', name: "main", component: MainMenu },
    { path: '/presensi', name: "presensi", component: PresensiPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
