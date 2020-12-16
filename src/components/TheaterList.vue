<template>
  <div class="theaterlist">
    <b-list-group>
      <b-list-group-item
        button
        v-for="(theater, idx) in theaterList"
        :key="idx"
        @click="routeTo(theater.id)"
      >
        {{ theater.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheaterList",
  computed: {
    ...mapState({
      theaterList: (state) => state.theater.theaterListFindByMovieId,
    }),
  },
  mounted() {
    this.$store.state.theater.theaterListFindByMovieId = null;
    this.$store
      .dispatch("theater/fetchTheaterByMovieId", {
        movieId: this.$route.params.movieId,
      })
      .then(() => {
        console.log(this.theaterList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    routeTo(theaterId) {
      this.$router.push({
        name: "SelectTime",
        query: {
          movieid: this.$route.params.movieId,
          theaterid: theaterId,
        }
      });
    },
  },
};
</script>