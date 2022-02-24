// 详情页的的仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
// 引入生成游客UUId的函数
import { getUUID } from '@/utils/uuid'

const actions = {
    // 获取商品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 添加商品或更新购物车是否成功
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const state = {
    goodsInfo: {},
    // 生成唯一游客标识，只发送一次
    uuid_token: getUUID()
}

// 简化数据
const getters = {
    // 面包屑索引
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 产品信息，包括大图
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 商品售卖属性简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    },
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}