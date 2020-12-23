<template>
  <div class="admin">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info text-left">
            <b-form-select
              v-model="form.selected_movie"
              :options="movieOptions"
              class="mt-4"
            ></b-form-select>
            <b-form-select
              v-model="form.selected_theater"
              :options="theaterOptions"
              class="mt-5 mb-5"
            ></b-form-select>
            <b-form-group
              id="input-showing-audio"
              label-for="input-showing-audio"
            >
              <h4>Audio</h4>
              <div class="input-box">
                <b-form-input
                  id="showing-audio"
                  v-model="form.audio"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>
            <h4>Select Date</h4>
            <b-form-datepicker
              id="datepicker"
              v-model="form.showing_date"
            ></b-form-datepicker>
            <br />
            <h4>Select Time</h4>
            <b-form-timepicker
              v-model="form.showing_time"
              show-seconds
              :hour12="false"
            ></b-form-timepicker>
            <br />
            <div class="text-center">
              <b-button
                class="mt-4 mb-3 btn btn-default"
                variant="primary"
                to=""
              >
                Add
              </b-button>
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
      theaterOptions: [{ value: null, text: "請選擇影城" }],
      movieOptions: [{ value: null, text: "請選擇電影" }],
      show: true,
    };
  },
  mounted() {
    this.adminCheck();
    this.initMovie();
    this.initTheater();
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
      theaterList: (state) => state.theater.theaterList,
    }),
  },
  methods: {
    // 管理員檢查
    adminCheck() {
      this.$store.dispatch("user/adminBoard", {
        token: localStorage.getItem("token"),
      });
    },
    // 初始化電影
    initMovie() {
      this.$store
        .dispatch("movie/fetchMovieByRelease", { release: "all" })
        .then(() => {
          this.initMovieOptions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 初始化電影選單
    initMovieOptions() {
      this.movieList.forEach((movie) => {
        this.movieOptions.push({ value: movie.id, text: movie.name });
      });
      console.log(this.movieOptions);
    },
    // 呼叫影城api
    initTheater() {
      this.$store
        .dispatch("theater/fetchAllTheater")
        .then(() => {
          this.initTheaterOptions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 初始化影城選單
    initTheaterOptions() {
      this.theaterList.forEach((theater) => {
        this.theaterOptions.push({ value: theater.id, text: theater.name });
      });
      console.log(this.theaterOptions);
    },
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
