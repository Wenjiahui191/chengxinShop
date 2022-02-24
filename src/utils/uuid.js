import { v4 as uuidv4 } from 'uuid';

// 生成uuid的方法，只生成一次
export const getUUID = () => {
    // 先从本地存储中读取
    let uuid_token = localStorage.getItem('UUID_TOKEN')
        // 如果没有才生成，且只生成一次
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUID_TOKEN', uuid_token)
    }
    return uuid_token
}