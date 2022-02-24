// 搜索页的的仓库
import { reqSearchList } from '@/api/index'

const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
    searchList: {}
}
const getters = {
    // 计算属性：商品列表
    goodsList(state) {
        // 假如没有网络返回一个空数组
        return state.searchList.goodsList || []
    },
    // 品牌列表
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    // 获取属性列表
    attrsList(state) {
        return state.searchList.attrsList
    },
    // 搜索页总的数据条数
    total(state) {
        return state.searchList.total
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}