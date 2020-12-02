<template>
  <div class="movie">
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
      <b-container fluid="lg" class="text-left">
        <b-row>
          <b-col md="3">
            <img
              class="movie-img"
              :src="require(`../assets/${movie.picPath}`)"
              alt=""
            />
          </b-col>
          <b-col md="3">
            <h2>{{ movie.name }}</h2>
            <h3>{{ movie.nameEN }}</h3> 
            <p>上映日期：{{ movie.release_date }}</p>
            <h2>MOVIE INFO</h2>
            <p>導演：{{ movie.director }}</p>
            <p>演員：{{ movie.actors }}</p>
            <p>類型：{{ movie.movie_type }}</p>
            <p>片長：{{ convertTime(movie.running_time) }}</p>
          </b-col>
        </b-row>
        <b-row>
          <p>{{ movie.description }}</p>
        </b-row>
      </b-container>
      <Footer />
    </b-overlay>
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
      wait: (state) => state.movie.wait,
    }),
  },
  mounted() {
    // this.$store.state.movie.movie = null;
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
  methods: {
    convertTime(totalMinutes) {
      let hours = totalMinutes / 60;
      let minutes = totalMinutes % 60;
      return Math.floor(hours) + " 時 " + minutes + " 分";
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/Movie";
</style>