import {reqAddressInfo,reqShopInfo,reqSubmitOrder} from '@/api'


//trade 相关的配置
export default {
	//namespaced: true, //的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	actions:{
        async getAddressInfo({commit}){
			let res =  await reqAddressInfo();
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-getAddressInfo-res',res)
            if(res.code === 200){
                commit('GETADDRESSINFO',res.data)
                return 'ok'
            }
            else{
                return Promise.reject(new Error(res.message))
            }
		},
        async getShopInfo({commit}){
			let res =  await reqShopInfo();
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-getShopInfo-res',res)
            if(res.code === 200){
                commit('GETSHOPINFO',res.data)
                return 'ok'
            }
            else{
                return Promise.reject(new Error(res.message))
            }
		},

          //提交订单:tradeNO 交易编码   data:付款人信息
       async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit('SUBMITINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }

	},
	mutations:{
        GETADDRESSINFO(state,AddressInfo){
            console.log('mutations-AddressInfo:::',AddressInfo)
            state.AddressInfo = AddressInfo;
            return state.AddressInfo;         
        },
        GETSHOPINFO(state,ShopInfo){
            console.log('mutations-AddressInfo:::',ShopInfo)
            state.ShopInfo = ShopInfo;
            return state.ShopInfo;         
        },
        SUBMITINFO(state,payId){
            state.payId = payId;
            return state.payId
        }
		


       
	},
	state:{
        AddressInfo:{},
        ShopInfo:{},
        payId:{}
	},
	getters:{
		
	},
}