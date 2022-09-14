/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Ratings from "@/views/Ratings.vue";
import DecksPage from "@/views/DecksPage.vue";
import NotFound from "@/views/NotFound.vue";
import Battles from "@/views/Battles.vue";

import store from "@/store";

import { getAuth } from "firebase/auth";
import firebaseConfig from "@/store/config/firebase"
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { auth: true },
    component: Home,
  },
  {
    path: "/ratings",
    name: "Ratings",
    meta: { auth: true },
    component: Ratings,
  },
  {
    path: "/decks",
    name: "DecksPage",
    meta: { auth: true },
    component: DecksPage,
  },
  {
    path: "/battles",
    name: "Battles",
    meta: { auth: true },
    component: Battles,
  },
  {
    path: "/login",
    name: "Login",
    meta: { auth: false },

    component: Login
  },
  {
    path: "/register",
    name: "Register",
    meta: { auth: false },

    component: Register
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
let isAuth = false

router.beforeEach((to, from, next) => {
  const user = store._actions['user/loggedUser'][0]()
  let resultUser;
  const requireAuth = to.matched.some((record) => record.meta.auth)
  user.then(result => {
    resultUser = result
  }).catch((error) => {
    resultUser = error
  }).finally(() => {
    const currentUser = getAuth().currentUser

    if (requireAuth && !currentUser) {
      next({ name: 'Login' })
    } else if ((to.name === "Login" || to.name === "Register") && currentUser) {
      next('/')
    } else {
      next()
    }
  })
})


export default router;
