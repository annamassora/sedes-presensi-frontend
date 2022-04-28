import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from "./router";
import store from "./store";
loadFonts()
// import Dynamic from './pages/Dynamic.vue'
//konfigurasi vue-router

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
  
const app = createApp(App)
app.use(VueSweetalert2);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');