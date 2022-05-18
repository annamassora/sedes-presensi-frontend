import { createWebHistory, createRouter } from "vue-router";
import loginPage from './view/LoginPage.vue'
import profilePage from './view/ProfilePage.vue'
import checkinPage from './view/CheckIn.vue'
import checkoutPage from './view/CheckOut.vue'
import reportPage from './view/ReportPage.vue'
import dashboardPage from './view/DashboardPage.vue'
// lazy-loaded
const MainMenu = () => import("./view/MainMenu.vue")
const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: "login", component: loginPage },
    { path: '/main', name: "main", component: MainMenu,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /users/:username is matched
      { path: '', component: dashboardPage, name:"Dashboard" },
      { path: 'checkin', component: checkinPage, name:"Check-In"  },
      { path: 'checkout', component: checkoutPage, name:"Check-Out"  },
      { path: 'report', component: reportPage, name:"Report"  },

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
