<template>
  <div class="showing-detail">
    <b-row>
      <b-col md="6">
        <h3>{{ movieName }}</h3>
        <h5>{{ movieNameEn }}</h5>
      </b-col>
      <b-col md="6">
        <p>時間：{{ getDatetime(showTime) }}</p>
        <p>影城：{{ theaterName }}</p>
        <p>影廳：{{ theaterAudio }}廳</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShowingDetail",
  props: {
    showingid: Number,
  },
  computed: {
    ...mapState({
      movieName: (state) => state.showing.movieName,
      movieNameEn: (state) => state.showing.movieNameEn,
      theaterName: (state) => state.showing.theaterName,
      showTime: (state) => state.showing.showTime,
      theaterAudio: (state) => state.showing.theaterAudio,
    }),
  },
  mounted() {
    // 初始化電影資訊
    this.initDetail();
  },
  methods: {
    initDetail() {
      this.$store.dispatch("showing/fetchDetailByShowingId", {
        showingId: this.showingid,
      });
    },
    getDatetime(datetime) {
      let date = new Date(datetime);
      return (
        date.getFullYear() +
        "/" +
        date.getMonth() +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
  },
}
</script>