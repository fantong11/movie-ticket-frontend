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

export default {
  name: "SelectTime",
  components: {
    ResponsiveNavigation,
  },
  data() {
    return {
      movieName: "鬼滅之刃",
      theater: "XX影城",
      movieDates: [
        {
          date: "2020 年 12 月 16 日 星期三",
          showings: [
            {
              id: 1,
              time: "12:30",
            },
            {
              id: 2,
              time: "13:30",
            },
          ],
        },
        {
          date: "2020 年 12 月 17 日 星期三",
          showings: [
            {
              id: 5,
              time: "12:30",
            },
            {
              id: 7,
              time: "13:30",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("showing/fetchShowing", {
      movieId: this.$route.query.movieid,
      theaterId: this.$route.query.theaterid,
    });
  },
};
</script>