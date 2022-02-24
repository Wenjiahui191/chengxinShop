// 主页home的仓库

// 引入api中关于categroyList的函数请求
import { reqBannerList, reqBaseCategoryList, reqFloorList } from '@/api/index'
const state = {
    // 分类列表信息
    categoryLists: [],
    // banner信息
    bannerList: [],
    // floor信息
    floorList: []
}

const actions = {
    async categoryList({ commit }) {
        let result = await reqBaseCategoryList()
        commit('CATEGROYlIST', result.data)
    },

    async getBannerList({ commit }) {
        let result = await reqBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },

    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}

const mutations = {
    CATEGROYlIST(state, categoryLists) {
        state.categoryLists = categoryLists.slice(0, 16) || []
    },

    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },

    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}