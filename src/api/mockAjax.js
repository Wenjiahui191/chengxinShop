// axios二次封装
import axios from 'axios'

// 导入nrpogress进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例，对其进行一定的配置
const requests = axios.create({
    // 配置基础路径
    baseURL: '/mock',
    // 请求超时
    timeout: 5000,
})

/// 添加请求拦截器
requests.interceptors.request.use(function(config) {
    nprogress.start()

    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function(response) {
    nprogress.done();

    // 对响应数据做点什么
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default requests