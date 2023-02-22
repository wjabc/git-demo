import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入vuex
import store from '@/store'
//全局组件
import TypeNav from '@/components/typeNav';
import Carsouel from '@/components/Carsouel';
import Pagination from '@/components/Pagination';
// // 引入vue-UUID组件
// import UUID from 'vue-uuid'
// Vue.use(UUID)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsouel.name,Carsouel)
Vue.component(Pagination.name,Pagination)
//阻止vue在启动时生成生产提示
Vue.config.productionTip = false
import '@/mock/mockServe';
import "swiper/css/swiper.min.css";
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Row, Col, MessageBox,Message,Input} from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$message = Message;
import '@/plugins/validate'//表单验证
// import {reqCategoryList} from '@/api';
// reqCategoryList();
new Vue({
  render: h => h(App),
  //注册路由，key和value一致，省略value（router必须小写）
  router,
  store,
  // beforeCreate中模板未解析，且this是vm
	beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	}
}).$mount('#app')


