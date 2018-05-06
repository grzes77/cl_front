import Vue from 'vue'
import Router from 'vue-router'
import User from '@/User'
import Admin from '@/Admin'
import Front from '@/components/Front'
import List from '@/components/links/Links'
import ShopList from '@/components/shop/List'
import Login from '@/components/Login'
import Basket from '@/components/shop/Basket'
import FormOrder from '@/components/shop/FormOrder'


Vue.use(Router)
export default new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: User,
            children: [
                {
                    path: '/',
                    name: 'Front',
                    component: Front
                }
            ]
        },

        {
          path: '/admin',
          component: Admin,
            children:[
                {
                  path: '/list',
                    component: List
                },
                {
                    path:'/shop',
                    component: ShopList
                },
                {
                    path:'/basket',
                    component: Basket
                },
                {
                    path:'/formOrder',
                    component: FormOrder
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})