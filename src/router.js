import { createWebHistory, createRouter } from "vue-router";
import LoginPage from './view/LoginPage.vue'
import profilePage from './view/ProfilePage.vue'
import PresensiPage from './view/PresensiPage.vue'
// lazy-loaded
const MainMenu = () => import("./view/MainMenu.vue")
const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: "login", component: LoginPage },
    { path: '/main', name: "main", component: MainMenu,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /users/:username is matched
      { path: '', component: PresensiPage },

      // UserProfile will be rendered inside User's <router-view>
      // when /users/:username/profile is matched
      { path: 'profile',  name: "profile", component: profilePage },

      // UserPosts will be rendered inside User's <router-view>
      // when /users/:username/posts is matched
    ],},
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
