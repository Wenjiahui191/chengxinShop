// 订单支付页面数据仓库数据仓库
import { reqGetTradeInfo, reqUserAddress } from '@/api'

const actions = {
    // 获取用户地址列表
    async getUserAddress({ commit }) {
        let result = await reqUserAddress()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取订单页面数据
    async getTradeInfo({ commit }) {
        let result = await reqGetTradeInfo()
        if (result.code == 200) {
            commit('GETTRADEINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, UserAddress) {
        state.UserAddress = UserAddress
    },
    GETTRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}
const state = {
    // 地址列表
    UserAddress: [],
    // 支付页面信息
    tradeInfo: {}
}

// 简化数据
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}