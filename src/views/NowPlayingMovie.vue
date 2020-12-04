<template>
  <div class="nowplayingmovie">
    <b-overlay
      :show="wait"
      spinner-variant="primary"
      spinner-type="grow"
      rounded="sm"
      variant="white"
      opacity="1"
    >
      <ResponsiveNavigation />
      <Breadcrumb />
      <b-container>
        <div class="text-left">
          <h2 class="m-0 mt-4">熱映中</h2>
        </div>
      </b-container>
      <MovieList release="now" />
      <Footer />
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MovieList from "@/components/MovieList.vue";
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "nowplayingmovie",
  components: {
    MovieList,
    ResponsiveNavigation,
    Breadcrumb,
    Footer,
  },
  computed: {
    ...mapState({
      wait: (state) => state.movie.wait,
    }),
  },
};
</script>

 