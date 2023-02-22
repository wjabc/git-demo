import {reqGetCode,reqRegister,reqUserLogin,reqGetUserInfo,reqUserLogout} from '@/api'
import {setItem,getItem} from '@/utils/token'
//serach相关的配置
export default {
	//namespaced: true, //的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	actions:{
		async getCode({commit},phone){
			let res =  await reqGetCode(phone);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-getCode-res',res)
            if(res.code === 200){
                commit('GETCODE',res.data)
                return 'ok'
            }
            else{
                return Promise.reject(new Error(res.message))
            }
		},
        async registerUser({commit},params){
			let res =  await reqRegister(params);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-registerUser-res',res)
            if(res.code === 200){
                //注册成功
               return 'ok';
            }else {
                //注册失败
                return Promise.reject(new Error(res.message));
           }
		},
        async userLogin({commit},data){
			let res =  await reqUserLogin(data);
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-userLogin-res',res)
            if(res.code === 200){
                commit('SET_TOKEN',res.data.token)
                //以后开发的时候:经常的登录的成功获取token【持久化存储】
            //    localStorage.setItem('TOKEN', result.data.token);
                  setItem(res.data.token)
                return 'ok'
            }
            else{
                //注册失败
                return Promise.reject(new Error(res.message));
            }
		},
        // async getUserInfo({commit}){
		// 	let res =  await reqGetUserInfo();
        //     //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
        //     //reqCategoryList().then(res =>{console.log(res)})
		// 	console.log('actions-getUserInfo-res',res)
        //     if(res.code === 200){
        //         commit('GETUSERINFO',res.data)
        //         return 'ok'
        //     }
        //     else{
        //          //注册失败
        //          return Promise.reject(new Error(res.message));
        //     }
		// },
            //获取用户信息
      async getUserInfo({ commit, state, dispatch }) {
        let result = await reqGetUserInfo();
        if (result.code == 200) {
             commit('GETUSERINFO', result.data);
             return 'ok';
        } else {
             return Promise.reject();
        }
   },
        async userLogout({commit}){
			let res =  await reqUserLogout();
            //console.log('reqGetSearchInfo-commit',context,'value',value,'params',params,);
            //reqCategoryList().then(res =>{console.log(res)})
			console.log('actions-userLogout-res',res)
            if(res.code === 200){
                commit('CLEAR');
                return 'ok'
            }
            else{
                //注册失败
                return Promise.reject(new Error(res.message));
            }
		},
	},
	mutations:{
		GETCODE(state,code){
           console.log('mutations-shopCartList:::',code)
            state.code = code;
            return state.code;           
        },
        SET_TOKEN(state,token){
            console.log('mutations-SET_TOKEN:::',token)
            state.token = token;
            return state.token;
             
         },
         GETUSERINFO(state,userinfo){
            console.log('mutations-GETUSERINFO:::',userinfo)
            state.userinfo = userinfo;
            return state.userinfo;
             
         },
         CLEAR(state){
            
            // state.userinfo = {};
            //清除仓库相关用户信息
          state.token = '';
          state.nickName = '';
          //本地存储令牌清空
          localStorage.removeItem('TOKEN');
            
             
         },

       
	},
	state:{
		code:[],
        token:getItem(),
        userinfo:{}
        //token:localStorage.getItem("TOKEN"),
	},
	getters:{
		
	},
}