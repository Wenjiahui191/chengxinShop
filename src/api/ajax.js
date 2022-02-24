// axios二次封装
import axios from 'axios'
// 引入store 为获取uuid
import store from '@/store'

// 导入nrpogress进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例，对其进行一定的配置
const requests = axios.create({
    // 配置基础路径
    baseURL: '/api',
    // 请求超时
    timeout: 5000,
})

/// 添加请求拦截器
requests.interceptors.request.use(function(config) {
    nprogress.start()
        // 在请求头中携带游客的uuid
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token获取用户 信息
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (err) => {
    alert('服务器响应数据失败')
});



export default requests