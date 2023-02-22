import {reqShopCart,reqDeleteCart,reqUpdateChecked} from '@/api'
//serach相关的配置
export default {
	//namespaced: true, //的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	actions:{
		async getShopCart({commit}){
			let res =  await reqShopCart();
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-getshopCartList-res',res)
            if(res.code === 200){
                commit('GETSHOPCART',res.data)
            }
		},
		async deleteCartById({commit},skuId){
			let res =  await reqDeleteCart(skuId);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-deleteCartById-res',res)
            if(res.code === 200){
                return 'ok'
            }
		},
		async changeChecked({commit},{skuId, isChecked}){
			let res =  await reqUpdateChecked(skuId, isChecked);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-changeChecked-res',res)
            if(res.code === 200){
                return 'ok'
            }
		},
		 //修改全部商品的勾选的状态
		 allUpdateChecked({ commit, state, dispatch }, isChecked) {
			let arr = [];
			console.log('state.shopcart.shopCartInfo[0].cartInfoList:::',state.shopCartInfo
			)
			//获取购物车商品的个数,进行遍历
			state.shopCartInfo[0].cartInfoList.forEach(item => {
				 //调用修改某一个商品的action【四次】
				 let ps = dispatch("changeChecked", { skuId: item.skuId, isChecked });
				 arr.push(ps);
			})
			//Promise.all():参数需要的是一个数组【数组里面需要promise】
			//Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
			//成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
			return Promise.all(arr);
	   },
	   //删除选中的商品
	   deleteAllCart({ commit, state, dispatch }) {
			let arr = [];
			//获取仓库里面购物车的数据
			console.log('state.shopcart.shopCartInfo[0].cartInfoList:::',state.shopCartInfo[0].cartInfoList)
			state.shopCartInfo[0].cartInfoList.forEach(item => {
				 //商品的勾选状态是勾选的,发请求一个一个删除
				 if (item.isChecked == 1) {
					  let ps = dispatch('deleteCartById', item.skuId);
					  arr.push(ps);
				 }
			})
			return Promise.all(arr);
	   }
	},
	mutations:{
		GETSHOPCART(state,shopCartInfo){
           console.log('mutations-shopCartList:::',shopCartInfo)
            state.shopCartInfo = shopCartInfo;

            return state.shopCartInfo;
            
        },
	},
	state:{
		shopCartInfo:[]
	},
	getters:{
		CartInfo(state){
			return state.shopCartInfo[0]||{}
		}
	},
}