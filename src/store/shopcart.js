// 购物车数据仓库
import { reqChangeCheckedById, reqDeleteShopCart, reqShopCartInfo, } from '@/api/index'

const actions = {
    // 获取购物车的数据
    async getShopCartInfo({ commit }) {
        let result = await reqShopCartInfo()
        if (result.code == 200) {
            commit('GETSHOPCARTINFO', result.data)
        }
    },
    // 删除购物车
    async deleteShopCart({ commit }, skuId) {
        let result = await reqDeleteShopCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改商品选中状态
    async changeCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqChangeCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除所有选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let cartList = getters.cartList.cartInfoList
        let PromiseAll = []
        cartList.forEach(cart => {
            let promise = cart.isChecked == 1 ? dispatch('deleteShopCart', cart.skuId) : ''
            PromiseAll.push(promise)
        });
        // 检查是否将所有选中都成功删除
        return Promise.all(PromiseAll)
    },
    // 全选修改产品选中状态
    allCartChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        let cartList = getters.cartList.cartInfoList
        cartList.forEach((cart) => {
            let promise = dispatch('changeCheckedById', { skuId: cart.skuId, isChecked: isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETSHOPCARTINFO(state, cartInfo) {
        state.cartInfo = cartInfo
    }
}
const state = {
    cartInfo: []
}

// 简化数据
const getters = {
    cartList(state) {
        return state.cartInfo[0] || {}
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}