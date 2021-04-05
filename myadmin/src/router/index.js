import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/product/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/index'),
        name: 'Customer',
        meta: { title: '顾客管理', icon: 'customer', affix: true }
      }
    ]
  },
  {
    path: '/cus_details',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/cus_details'),
        name: 'Cus_details',
        meta: { title: '顾客详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/orderdetail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/components/orderdetail'),
        name: 'CusOrderdetails',
        meta: { title: '顾客详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/index'),
        name: 'Product',
        meta: { title: '产品管理', icon: 'product', noCache: true }
      }
    ]
  },
  {
    path: '/details',  //父路由
    component: Layout,
    children: [
      {
        path: 'index',    //子路由
        component: () => import('@/views/product/details'),
        name: 'Details',
        meta: { title: '产品详情' },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/category/index'),
        name: 'Category',
        meta: { title: '栏目管理', icon: 'category', noCache: true }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/detail'),
        name: 'Detail',
        meta: { title: '订单详情'},
        hidden: true
      }
    ]
  },

  {
    path: '/staff',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/staff/index'),
        name: 'Staff',
        meta: { title: '员工管理', icon: 'staff' }
      }
    ]
  },
  {
    path: '/staff_detail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/staff/staff_detail'),
        name: 'Staff_detail',
        meta: { title: '员工详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/staffOrderdetail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/staff/components/staffOrderdetail'),
        name: 'staffOrderdetail',
        meta: { title: '员工详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/comment/index'),
        name: 'Comment',
        meta: { title: '评论管理', icon: 'comment' }
      }
    ]
  },

  {
    path: '/sure',
    component: Layout,
    redirect: '/sure/download',
    alwaysShow: true,
    name: 'Sure',
    meta: { title: '审核大厅', icon: 'sure' },
    children: [
      {
        path: 'staff',
        component: () => import('@/views/sure/staff'),
        name: 'Staff',
        meta: { title: '员工审核' }
      },

      {
        path: 'cashout',
        component: () => import('@/views/sure/cashout'),
        name: 'Cashout',
        meta: { title: '提现审核' }
      }
    ]
  },

  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
