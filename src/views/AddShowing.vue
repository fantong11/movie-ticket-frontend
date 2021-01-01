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
              v-model="form.selectedMovie"
              :options="movieOptions"
              class="mt-4"
            ></b-form-select>
            <b-form-select
              v-model="form.selectedTheater"
              :options="theaterOptions"
              class="mt-5 mb-5"
            ></b-form-select>
            <b-form-select
              v-model="form.selectedAudio"
              :options="audioOptions"
              class="mb-4"
            ></b-form-select>
            <h4 class="pt-3">Select Date</h4>
            <b-form-datepicker
              id="datepicker"
              v-model="form.showingDate"
            ></b-form-datepicker>
            <br />
            <h4 class="pt-3">Select Time</h4>
            <b-form-timepicker
              v-model="form.showingTime"
              show-seconds
              :hour12="false"
            ></b-form-timepicker>
            <br />
            <div class="mt-3">
              Selected:
              <strong>{{ form.showingDate + " " + form.showingTime }}</strong>
            </div>
            <div class="text-center">
              <b-button
                @click="addShowing"
                class="mt-4 mb-3 btn btn-default"
                variant="primary"
                to=""
              >
                Add
              </b-button>
            </div>
            <div>
              Selected: <strong>{{ form.selectedAudio }}</strong>
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
        selectedMovie: null,
        selectedTheater: null,
        selectedAudio: null,
        showingDate: "",
        showingTime: "",
      },
      theaterOptions: [{ value: null, text: "請選擇影城" }],
      movieOptions: [{ value: null, text: "請選擇電影" }],
      audioOptions: [
        { value: null, text: "請選擇分院" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
      ],
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
      showingId: (state) => state.showing.showingId,
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
          showingDatetime: this.form.showingDate + " " + this.form.showingTime,
          showingAudio: this.form.selectedAudio,
          playInMovieId: this.form.selectedMovie,
          playInTheaterId: this.form.selectedTheater,
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
