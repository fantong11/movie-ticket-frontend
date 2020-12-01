<template>
  <div class="comingmovie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container>
      <div class="text-left">
        <h2 class="m-0 mt-4">即將上映</h2>
      </div>
    </b-container>
    <MovieList :movie-list="movieList.slice(6,10)" />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MovieList from "@/components/MovieList.vue";
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ComingMovie",
  components: {
    MovieList,
    ResponsiveNavigation,
    Breadcrumb,
    Footer,
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
      wait: (state) => state.movie.wait,
    }),
  },
};
</script>