<template>
  <div class="movie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "movie",
  components: {
    ResponsiveNavigation,
    Breadcrumb,
    Footer,
  },
  computed: {
    ...mapState({
      movie: (state) => state.movie.movie,
    }),
  },
  created() {
    this.$store
      .dispatch("movie/fetchOneMovie", { movieId: this.$route.params.movieId })
      .then(() => {
        this.$route.meta.breadcrumb[2].name = this.movie.name;
        console.log(this.$route.meta.breadcrumb[2].name);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>