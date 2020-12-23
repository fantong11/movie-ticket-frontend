<template>
  <div class="admin">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info text-left">
            <b-form-select v-model="selected_movie" :options="movieName" class="mt-4"></b-form-select>

            <b-form-select v-model="selected_theater" :options="theaterList" class="mt-5 mb-5"></b-form-select>

            <h4>Select Date</h4>
            <b-form-datepicker id="datepicker" v-model="form.showing_date"></b-form-datepicker>

            <br>
            <h4>Select Time</h4>
            <b-form-timepicker v-model="form.showing_time" show-seconds :hour12="false"></b-form-timepicker>
            <br>

            <div class="text-center">
              <b-button class="mt-4 mb-3 btn btn-default" variant="primary" to="">Add</b-button>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar.vue";
import { mapState } from "vuex";

export default {
  name: "AddShowing",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      form: {
        selected_movie: null,
        selected_theater: null,
        showing_date: "",
        showing_time: "",
      },
      show: true,
    };
  },
  mounted() {
    this.$store.dispatch("user/adminBoard", {
      token: localStorage.getItem("token"),
    });
    this.$store
      .dispatch("movie/fetchMovieName", {})
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store
      .dispatch("theater/fetchAllTheater", {})
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapState({
      movieName: (state) => state.movie.movieName,
      theaterList: (state) => state.theater.theaterList,
    }),
  },
  methods: {
    addShowing() {
      this.$store
        .dispatch("showing/addShowing", {
          token: localStorage.getItem("token"),
          movie: this.form.selected_movie,
          theater: this.form.selected_theater,
          showing_date: this.form.showing_date,
          showing_time: this.form.showing_time,
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
