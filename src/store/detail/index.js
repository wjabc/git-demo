import {reqDetailList,reqAddToCart} from '@/api'
import {getUUID} from '@/utils/USER_ID'
//serach相关的配置
export default {
	//namespaced: true, //的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	actions:{
		async getGoodsList(context,skuId){
			let res =  await reqDetailList(skuId);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('getGoodsInfo-res:',res,'value:',skuId)
            if(res.code === 200){
                context.commit('GETGOODLIST',res.data)
            }
		},
		 async getAddToCart({ state, commit, dispatch }, { skuId, skuNum }) {
			let res =  await reqAddToCart(skuId,skuNum);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('getAddToCart-res',res)
           	if (res.code == 200) {
				 //如果加入购物车成功,返回promise即为成功
				 return "okkkkk";
				 
			} else {
				 //如果加入购物车失败，返回失败的Promise
				 return Promise.reject();
			}
		},

	},
	mutations:{
		GETGOODLIST(state,goodList){
           console.log('goodList-state',state,'goodList',goodList)
            state.goodList = goodList;
			console.log('uuid_token::',state.uuid_token)
            return state.goodList;
            
        },
	},
	state:{
		goodList:{},
		//游客临时身份
		uuid_token:getUUID(),
	},
	getters:{
		categoryView(state){
			return state.goodList.categoryView||{}
		},
		skuInfo(state){
			return state.goodList.skuInfo||{}
		},
		spuSaleAttrList(state){
			return state.goodList.spuSaleAttrList||{}
		}
	},
}