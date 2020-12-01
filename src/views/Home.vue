<template>
  <div class="home">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App" />
    <Carousel />
    <b-container class="content-container" fluid="lg">
      <b-row>
        <b-col md="6">
          <QuickSearch />
        </b-col>
        <b-col md="6">
          <div class="news">
            <h3>最新公告 <b-badge>MORE</b-badge></h3>
            <p><b-badge>2020/10/13</b-badge>《阿比阿弟尋歌大冒險》片尾公告</p>
            <p><b-badge>2020/10/05</b-badge>【刑警沒有假期】片尾公告</p>
            <p><b-badge>2020/07/31</b-badge> 防疫新生活、觀影實聯制</p>
            <p><b-badge>2020/07/14</b-badge> 振興三倍券、藝FUN券使用提醒</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Carousel from "@/components/Carousel.vue";
import QuickSearch from "@/components/QuickSearch.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "Home",
  components: {
    ResponsiveNavigation,
    Carousel,
    QuickSearch,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "./styles/HomeStyles";
</style>