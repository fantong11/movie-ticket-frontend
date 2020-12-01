<template>
  <div class="comingmovie">
    <ResponsiveNavigation />
    <Footer />
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "ComingMovie",
  components: {
    ResponsiveNavigation,
    Footer,
  },
};
</script>