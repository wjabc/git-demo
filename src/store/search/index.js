import {reqGetSearchInfo} from '@/api'
//serach相关的配置
export default {
	//namespaced: true, //的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	actions:{
		async getSearchList({commit},params={}){
			let res =  await reqGetSearchInfo(params);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('getSearchList-res',res)
            if(res.code === 200){
                commit('GETSEARCHLIST',res.data)
            }
		}
	},
	mutations:{
		GETSEARCHLIST(state,searchList){
           console.log('searchList-state',state,'searchList',searchList,'searchList-this:',this)
            state.searchList = searchList;
            return state.searchList;
            
        },
	},
	state:{
		searchList:{}
	},
	getters:{
		attrsList(state){
            return state.searchList.attrsList
        },
		goodsList(state){
            return state.searchList.goodsList
        },
		trademarkList(state){
            return state.searchList.trademarkList
        },
	},
}