<template>
  <div class="nowplayingmovie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container>
      <div class="text-left">
        <h2 class="m-0 mt-4">熱映中</h2>
      </div>
    </b-container>
    <MovieList :movie-list="movieList.slice(0,6)" />
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
  name: "nowplayingmovie",
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