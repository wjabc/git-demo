<template>
            <!--banner轮播-->
        <div class="swiper-container" ref="mySwiper" id="mySwiperBanner">
          <!-- swiper-wrapper里面每一个slider即为一张图片 -->
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carsouel) in list"
              :key="carsouel.id"
            >
              <img :src="carsouel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>
<script>
import Swiper from "swiper";

export default {
      name: 'carsouel',
  
  data(){
    return {
      
    }
  },
  props:['list'],
  watch:{
      list:{
          immediate: true,
           handler(){
               
      // bannerList函数若执行了，证明数据绝对变化了，但页面DOM还没有好
      this.$nextTick(() => {
        // $nextTick指定的回调若执行了，证明页面DOM结构更新完毕了
        /* eslint-disable no-new */
        new Swiper(this.$refs.mySwiper, {
          slidesPerView: 1, // 同时展示几屏
          spaceBetween: 30, // 两屏之间的间隔
          loop: true, // 循环轮播
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      })}}
  },
}
</script>