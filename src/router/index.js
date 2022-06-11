import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Layout */
import Layout from "@/layout"

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  {
    name: "Acl",
    path: "/acl",
    component: Layout,
    redirect: "/acl/user",
    meta: { title: "权限管理", icon: "el-icon-lock" },
    children: [
      {
        name: "User",
        path: "/acl/user",
        component: () => import("@/views/acl/user/index"),
        meta: { title: "用户管理" },
      },
      {
        name: "Role",
        path: "/acl/role",
        component: () => import("@/views/acl/role/index"),
        meta: { title: "角色管理" },
      },
    ],
  },

  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "/product/tardmark",
        name: "TardMark",
        component: () => import("@/views/product/tradeMark/index"),
        meta: { title: "品牌管理" },
      },
      {
        path: "/product/attr",
        name: "Attr",
        component: () => import("@/views/product/Attr/index"),
        meta: { title: "平台属性管理" },
      },
      {
        path: "/product/spu",
        name: "Spu",
        component: () => import("@/views/product/Spu/index"),
        meta: { title: "Spu管理" },
      },
      {
        path: "/product/sku",
        name: "Sku",
        component: () => import("@/views/product/Sku/index"),
        meta: { title: "sku管理" },
      },
    ],
  },

  { path: "*", redirect: "/404", hidden: true },
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
