import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入Vuex
import store from '@/store'

// 引入api请求接口
import * as API from '@/api'

Vue.config.productionTip = false

// 引入TypeNav组件并全局注册
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

// 引入mockServer文件并执行
import mockServer from '@/mock/mockServer'

// 注册轮播图全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

// 分页器全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination)

// copyright全局组件
import CopyRight from '@/components/CopyRight/CopyRight'
Vue.component(CopyRight.name, CopyRight)

// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 引入elementUi按需引入
import { Icon, Button, MessageBox } from 'element-ui';
Vue.use(Icon)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/1.jpg'
Vue.use(VueLazyload, {
    loading: atm,
})

// validate表单验证
import '@/pluging/validate'

new Vue({
    render: h => h(App),
    // 穿件全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this
            // 全局挂载API请求调用集
        Vue.prototype.$API = API
    },
    router, //挂载路由器 $router $route路由信息主要是组件获取传递参数
    store, //挂载vuex 组件实例对象上出现$store
}).$mount('#app')