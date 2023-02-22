<template>
<div>
    <typeNav></typeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
</div>
  
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "./listContainer";
import Recommend from "./recommend";
import Rank from "./rank";
import Like from "./like";
import Floor from "./floor";
import Brand from "./brand";
export default {
 name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },

  mounted(){
    this.$store.dispatch('getFloorList');
    this.$store.dispatch('getUserInfo');
  },
  computed:{
      //借助mapState生成计算属性，从state中读取数据。（数组写法）
			...mapState({floorList:(state)=>{
        return state.home.floorList
      }}),
      // ...mapState({floorList:(state)=>{
      //   return state.home.floorList
      // }}),
  },
}


</script>

<style>

</style>