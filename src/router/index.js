import Vue from "vue";
import VueRouter from "vue-router";
import TimelineVue from "../views/TimelineView.vue";
import Users from "../views/UsersView.vue";
import UserProfile from "../views/UserProfileView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Timeline",
    component: TimelineVue,
  },
  {
    path: "/Users",
    name: "Users",
    component: Users,
  },
  {
    path: "/User-profile/:username",
    name: "UserProfile",
    component: UserProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
