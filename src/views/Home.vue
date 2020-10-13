<template>
  <div class="home">
    <WebNav msg="Welcome to Your Vue.js App"/>
    <Carousel/>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import WebNav from '@/components/WebNav.vue'
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'Home',
  components: {
    WebNav,
    Carousel
  }
}
</script>
