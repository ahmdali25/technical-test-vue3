import { createRouter, createWebHistory } from "vue-router";
import DeliveryView from "../views/DeliveryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
  routes: [
    {
      path: "/",
      redirect: () => {
        return { path: "/delivery" };
      },
      // name: "home",
      // component: DeliveryView,
    },
    {
      path: "/delivery",
      name: "delivery",
      component: DeliveryView,
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/views/PaymentView.vue"),
    },
    {
      path: "/finish",
      name: "finish",
      component: () => import("@/views/FinishView.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
