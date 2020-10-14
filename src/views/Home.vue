<template>
  <div class="home">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App"/>
    <Carousel/>
  </div>
</template>

<script>
// @ is an alias to /src
import ResponsiveNavigation from '@/components/ResponsiveNavigation.vue'
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'Home',
  components: {
    ResponsiveNavigation,
    Carousel
  }
}
</script>
