<template>
  <div class="selecttime">
    <ResponsiveNavigation />
    <b-container>
      <h3 class="text-left mt-3">電影場次 Ｍove Time</h3>
      <h4 class="text-left">{{ theater }} {{ movieName }}</h4>
      <div
        class="movie-date mt-4"
        v-for="(movieDate, idx) in movieDates"
        :key="idx"
      >
        <b-row>
          <b-col md="12">
            <h4 class="text-left">{{ movieDate.date }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="(showing, idx) in movieDate.showings" :key="idx" md="2">
            <b-button block class="mt-2" variant="outline-secondary">
              {{ showing.time }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import { mapState } from 'vuex';

export default {
  name: "SelectTime",
  components: {
    ResponsiveNavigation,
  },
  data() {
    return {
      movieName: "鬼滅之刃",
      theater: "XX影城",
    };
  },
  computed: {
    ...mapState({
      movieDates: (state) => state.showing.movieDateTimes,
    }),
  },
  mounted() {
    this.$store.dispatch("showing/fetchShowing", {
      movieId: this.$route.query.movieid,
      theaterId: this.$route.query.theaterid,
    });
  },
};
</script>