// 封装一个存储token的函数
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

// 读取token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

// 清除token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}