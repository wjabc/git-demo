//api统一管理
import requests from "./request";
import mockrequest from "./mockrequest";

//三级联动接口：/api/product/getBaseCategoryList

export const reqCategoryList = ()=>{
        //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
       //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
      //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
     return requests({url:'/product/getBaseCategoryList',method:'get'})
}

export const reqGetBannerList = ()=>{

     return mockrequest({url:'/banner',method:'get'})
}
export const reqGetFloorList = ()=>{

     return mockrequest({url:'/floor',method:'get'})
}

export const reqGetSearchInfo = (params)=>{

  return requests({url:'/list',method:'post',data:params})
}
//商品详情
export const reqDetailList = (skuId)=>{

  return requests({url:`/item/${skuId }`,method:'get'})
}
///加入购入车 api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddToCart = (skuId,skuNum)=>{

     return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
//购物车列表 /api/cart/cartList
export const reqShopCart = ()=>{
     return requests({url:'/cart/cartList',method:'get'})
}
//删除某一个商品的接口
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});


//修改某一个商品的勾选的状态

export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//注册：获取验证码/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>{
     return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
//注册用户/api/user/passport/register
export const reqRegister = (params)=>{
     return requests({url:'/user/passport/register',method:'post',data:params})
}
//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,method:'post',data});

///获取用户信息 api/user/passport/auth/getUserInfo
export const reqGetUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

//退出登陆 /api/user/passport/logout
export const reqUserLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

//获取商品清单数据
export const reqShopInfo = ()=>requests({url:`/order/auth/trade`,method:'get'});

///提交订单 api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//查询支付结果
export const reqPayResult = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});