import requests from "./ajax";
// 引入mock发送请求
import mockRequests from './mockAjax'

// 请求商品分类列表
// /api/product/getBaseCategoryList get 
export const reqBaseCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner数据
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' })

// 获取floor层数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })


// 获取搜索页数据列表 POST
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params })


// 获取商品详情数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 添加或更新购物车信息/ api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车数据/api/cart/cartList
export const reqShopCartInfo = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车数据 /api/cart/deleteCart/{skuId}
export const reqDeleteShopCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
    // 修改购物车商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqChangeCheckedById = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

// 注册页面
// 获取手机验证码 /api/user/passport/sendCode/{phone}  get
export const reqCheckCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
    // 用户注册/api/user/passport/register POST
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })
    // 登录页面 /api/user/passport/login post
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 /api/user/passport/logout   GET
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户的地址/api/user/userAddress/auth/findUserAddressList get
export const reqUserAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单交易页面信息 /api/order/auth/trade  get
export const reqGetTradeInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 向服务器提交订单支付信息 /api/order/auth/submitOrder?tradeNo={tradeNo}   POST
export const reqSubmitPay = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 通过订单号获取支付金额 /api/payment/weixin/createNative/{orderId}    GET
export const reqOrderInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付状态 /api/payment/weixin/queryPayStatus/{orderId}    GET 
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的数据   /api/order/auth/{page}/{limit}      get
export const reqMyOrderInfo = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })