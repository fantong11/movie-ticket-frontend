<template>
  <div class="addmovie">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info text-left">
            <b-form-group id="input-movie-name" label-for="input-movie-name">
              <h4>Movie name</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-name"
                  v-model="form.name"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-nameEn"
              label-for="input-movie-nameEn"
            >
              <h4>Movie English Name</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-nameEn"
                  v-model="form.nameEn"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <!-- <h4>Picture</h4>
            <b-form-file accept=".jpg, .png" placeholder="Choose a picture">
            </b-form-file> -->

            <b-form-group
              id="input-movie-pic"
              label-for="input-movie-pic"
            >
              <h4>Movie Image/Picture</h4>
              <b-form-input
                id="movie-pic"
                v-model="form.pic"
                required
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-movie-description"
              label-for="input-movie-description"
            >
              <br />
              <h4>Movie Description</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-description"
                  v-model="form.description"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-runningtime"
              label-for="input-movie-runningtime"
            >
              <h4>Movie Running Time</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-runningtime"
                  v-model="form.runningtime"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-director"
              label-for="input-movie-director"
            >
              <h4>Movie Director</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-director"
                  v-model="form.director"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-actors"
              label-for="input-movie-actors"
            >
              <h4>Movie Actors</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-actors"
                  v-model="form.actors"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group id="input-movie-type" label-for="input-movie-type">
              <h4>Movie Type</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-type"
                  v-model="form.type"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-classification"
              label-for="input-movie-classification"
            >
              <h4>Movie Classification</h4>
              <div class="input-box">
                <b-form-input
                  id="movie-classification"
                  v-model="form.classification"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group id="input-movie-date" label-for="input-movie-date">
              <h4>Movie Date</h4>
              <b-form-datepicker id="datepicker" v-model="form.date"></b-form-datepicker>
            </b-form-group>
            <div class="text-center">
              <b-button
                @click="addMovie"
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

export default {
  name: "AddMovie",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      form: {
        name: "",
        nameEn: "",
        pic: "",
        description: "",
        runningtime: "",
        director: "",
        actors: "",
        type: "",
        classification: "",
        date: "",
      },
      show: true,
    };
  },
  mounted() {
    this.$store.dispatch("user/adminBoard", {
      token: localStorage.getItem("token"),
    });
  },
  methods: {
    addMovie() {
      this.$store
        .dispatch("movie/addMovie", {
          token: localStorage.getItem("token"),
          name: this.form.name,
          name_en: this.form.nameEn,
          pic_path: this.form.pic,
          description: this.form.description,
          running_time: this.form.runningtime,
          director: this.form.director,
          actors: this.form.actors,
          movie_type: this.form.type,
          classification: this.form.classification,
          release_date: this.form.date,
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
