<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userinfo.nickName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <span>{{userinfo.nickName}}</span>
                        <a class="register" style="cursor:pointer" @click="logout">退出登录</a>                     
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/">
                    <img src="./images/logo.png" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">
                搜索
              </button>
                </form>
            </div>
        </div>
        
    </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'Header',
    data() {
        return {
            keyword: '',

        }
    },
    methods: {
        //搜索按钮回调函数，需要向search路由进行跳转
        gosearch() {
            // this.$router.push({
            //     name: "search",
            //     params: {keyword: this.keyword},
            //     query: {k: this.keyword.toUpperCase()} 
            // });
            // console.log('parmas',this.$route.params)
            // console.log('query',this.$route.query)
            // console.log(this);

                let locations = {
                name: "search",
                params: { keyword: this.keyword || undefined },
                query:{}
                };
                //确定路径当中有query参数
                if (this.$route.query.categoryName) {
                locations.query = this.$route.query;
                }

          this.$router.push(locations);
          console.log('parmas',locations.params,'2',this.$route)
          console.log('query',locations.query,'2',this.$route.query)
        },
        async logout(){
           
           try {
            //注册成功
            await this.$store.dispatch("userLogout");
          } catch (error) {
            //注册失败
            alert(error.message);
          }
        //   this.$route.
        }

    },
    computed:{

    ...mapState({userinfo:(state)=>{
        return state.user.userinfo
      }}),
    },
    mounted() {
    //清除关键字
    this.$bus.$on("clearKeyword", () => {
      console.log(123);
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang='less'>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;
        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            .loginList {
                float: left;
                p {
                    float: left;
                    margin-right: 10px;
                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }
            .typeList {
                float: right;
                a {
                    padding: 0 10px;
                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }
    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .logoArea {
            float: left;
            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }
        .searchArea {
            float: right;
            margin-top: 35px;
            .searchForm {
                overflow: hidden;
                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;
                    &:focus {
                        outline: none;
                    }
                }
                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;
                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>