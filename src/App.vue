<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口位置 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.requiresAuth"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";


export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted(){
    this.$store.dispatch('categoryList','1')
  }
};
</script>

<style>

</style>
