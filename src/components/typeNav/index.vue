<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHandler" @click="goSearch">
      <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
         <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2">
                    <!--一级分类地盘-->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="enterHandler(index)" 
                  
                  :class="{ active: currentIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 通过JS实现动态行内样式，进行二级、三级分类的显示与隐藏(display:none|block切换的) -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <!--二级分类-->
                  <div
                    class="subitem"
                    v-for="(c2) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!--三级分类-->
                        <em
                          v-for="(c3) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
        </div>
            </div>
         </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>    
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
//引入手段:按需引入
import throttle from "lodash/throttle";
export default {
  name: "typeNav",
  //组件挂载完成，可以向服务器发送请求
  data(){
    return {
      currentIndex:-1,
      show:true,
      }
  },
  methods:{
    
    enterHandler:throttle(function(index){
      this.currentIndex = index;
    },50),
    leaveHandler(){
      this.currentIndex = -1;
      if (this.$route.path != "/home" ) {
        this.show = false;
        console.log('path',this.$route.path)
      }
    },
    //全部商品分类鼠标进入
    changeShow() {
      //鼠标进入:在search路由下,在修改数据
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    goSearch(event){
      let targetNode = event.target;
      let { categoryname, category1id, category2id, category3id } = targetNode.dataset;
       console.log('goSearch的event',event)
       console.log('goSearch的targetNode',targetNode)
       console.log('goSearch的dataset',{ categoryname, category1id, category2id, category3id })
      if (categoryname) {
        //点击只要是a,就是往search模块跳转
        var locations = {
          name: "search",
          query: { categoryName: categoryname },
        };
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }
        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
        //目前商品分类这里携带参数只有query参数
        this.$router.push(locations);
      }
    }
  },
  mounted(){
    //通知vuex发请求，获取数据存储与仓库中
    // this.$store.dispatch('categoryList','1')
    if (this.$route.path != "/home") {
        this.show = false;
        console.log('path',this.$route.path)
      }

  },
  computed:{
    //借助mapState生成计算属性，从state中读取数据。（数组写法）
			...mapState({categoryList:(state)=>{
        return state.home.categoryList
      }}),
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }

            &.active {
              background: yellowgreen;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          /*温馨提示:豪哥不想利用样式控制二级、三级分类显示与隐藏,下面的代码进行注释*/
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          
        }
      }
    }

    /*过渡动画:商品分类 进入阶段*/
    .sort-enter {
      height: 0px;
    }

    .sort-enter-active {
      transition: all 0.3s;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>

