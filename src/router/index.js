import Vue from "vue";
import Router from "vue-router";

import Parcheesi from "@/components/Parcheesi";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import ListGame from "@/components/ListGame";
import Account from "@/components/Account";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/game",
      name: "game",
      component: ListGame
    },
    {
      path: "/parcheesi",
      name: "parcheesi",
      component: Parcheesi
    },
    {
      path: "/account",
      name: "account",
      component: Account
    }
  ]
});
