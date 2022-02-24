import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex插件
Vue.use(Vuex)

//导入主页模块仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'


// 向外暴露Vuex实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})