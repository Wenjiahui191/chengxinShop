// 登录注册公用数据存储仓库
import { reqCheckCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from '@/api'
// 引入token处理函数
import { getToken, setToken, removeToken } from '@/utils/token'

const actions = {
    // 获取验证码
    async getCheckCode({ commit }, phone) {
        let result = await reqCheckCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    },
    // 用户登录 服务器返回token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
                // 登录成功存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error)
        }
    },
    // 获取用户数据
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }
    },
    // 退出登录
    async logout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            // 清除state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除用户信息及token
    CLEAR(state) {
        // 清除仓库中的用户信息
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const state = {
    // 存储从服务器获取的验证码
    code: '',
    token: getToken(),
    userInfo: {}
}

const getters = {

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}