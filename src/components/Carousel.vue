<template>
  <div>
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide 
        v-for="(banner, index) in banners" :key="index"
        :img-src="require(`../assets/${banner}`)"
        :img-alt="`${banner}`">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 圖片在/assets下的檔名
        banners: [
          "homepage1.jpg",
          "homepage2.jpg"
        ]
      }
    }
  }
</script>