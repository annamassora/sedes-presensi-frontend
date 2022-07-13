import { createWebHistory, createRouter } from "vue-router";
import loginPage from './view/LoginPage.vue'
import profilePage from './view/ProfilePage.vue'
import checkinPage from './view/CheckIn.vue'
import reportPage from './view/ReportPage.vue'
import dashboardPage from './view/DashboardPage.vue'
import listTeacher from './view/TeacherPage.vue'
import listStudent from './view/StudentPage.vue'
import listEmployee from './view/EmployeePage.vue'
import teacherdetail from './view/TeacherReport.vue'
import studentdetail from './view/StudentReport.vue'
import employeedetail from './view/EmployeeReport.vue'
import adminSetting from './view/AdminSetting.vue'

import qrCode from './view/QrcodePage.vue'


//Admin


// lazy-loaded - all
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
      { path: 'report', component: reportPage, name:"Report"  },
      { path: 'listTeacher', beforeEnter: checkAdminRights, component: listTeacher, name:"List Teacher"  },
      { path: 'listStudent', beforeEnter: checkAdminRights, component: listStudent, name:"List Student"  },
      { path: 'listEmployee', beforeEnter: checkAdminRights, component: listEmployee, name:"List Employee"  },
      { path: 'adminSetting', beforeEnter: checkAdminRights, component: adminSetting, name:"Admin Setting"  },
      { path: 'teacherdetail/:nourut', beforeEnter: checkAdminRights, component: teacherdetail, name:"Report Teacher",props: true   },
      { path: 'studentdetail/:nisn', beforeEnter: checkAdminRights, component: studentdetail, name:"Report Student",props: true   },
      { path: 'employeedetail/:nourut', beforeEnter: checkAdminRights, component: employeedetail, name:"Report Employee",props: true   },
      { path: 'qrCode', beforeEnter: checkAdminRights, component: qrCode, name:"List Qrcode"  },

      { path: 'profile',  name: "profile", component: profilePage },

      // UserPosts will be rendered inside User's <router-view>
      // when /users/:username/posts is matched
    ],},
];
function checkAdminRights(to, from, next) {
  const isAdmin = JSON.parse(localStorage.getItem('user')).user.role==2;
  if(isAdmin)
  {
    console.log("isAdmin",isAdmin)
    next();
  }
  else{
    next({ path:'/main'});
  }
  // check if the user is admin
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
