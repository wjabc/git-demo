import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'
//home相关的配置
export default {
	// namespaced:true,开启命名空间
	actions:{
        //通过api里面的接口函数调用
		 async categoryList(context,value){
            let res =  await reqCategoryList();
            console.log('reqCategoryList-context',context,'reqCategoryList-value',value);
            //reqCategoryList().then(res =>{console.log(res)})
            if(res.code === 200){
                context.commit('CATEGORYIST',res.data)
            }
        },

        // retCategoryList().then(res =>{console.log(res)})

        //通过api里面的接口函数调用
		 async getBannerList(context,value){
            let res =  await reqGetBannerList();
            console.log('reqBannerList-context',context,'reqBannerList-value',value);
            //reqCategoryList().then(res =>{console.log(res)})
            if(res.code === 200){
                context.commit('CATBANNERLIST',res.data)
            }
        },

        //通过api里面的接口函数调用
		 async getFloorList(context,value){
            let res =  await reqGetFloorList();
            console.log('reqGetFloorList-context',context,'reqGetFloorList-value',value);
            //reqCategoryList().then(res =>{console.log(res)})
            if(res.code === 200){
                context.commit('CATFLOORLIST',res.data)
            }
        },
	},
	mutations:{
		CATEGORYIST(state,categoryList){
            console.log('categoryList-state',state,'categoryList',categoryList,'categoryList-this:',this)
            state.categoryList = categoryList;
            return state.categoryList;
            
        },
        CATBANNERLIST(state,bannerList){
            console.log('bannerList-state',state,'bannerlist',bannerList,'bannerListthis:',this)
            state.bannerList = bannerList;
            return state.bannerList;
            
        },
        CATFLOORLIST(state,floorList){
            console.log('floorList-state',state,'floorList',floorList,'floorList-this:',this)
            state.floorList = floorList;
            return state.floorList;
            
        }
	},
	state:{
		categoryList:[],
        bannerList:[],
        floorList:[]
	},
	getters:{

	},
}