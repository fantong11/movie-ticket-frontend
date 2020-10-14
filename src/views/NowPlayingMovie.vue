<template>
  <div class="nowplayingmovie">
    <ResponsiveNavigation/>
    <Breadcrumb/>
  </div>
</template>

<script>
import ResponsiveNavigation from '@/components/ResponsiveNavigation.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'


export default {
  name: "nowplayingmovie",
  components: {
    ResponsiveNavigation,
    Breadcrumb
  }
}
</script>